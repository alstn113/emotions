import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentsRepository } from './comments.repository';
import { Comment } from '@prisma/client';
import { PostsRepository } from '../posts/posts.repository';
import { AppErrorException } from '~/common/exceptions';
import { SESService } from '~/providers/aws/ses/ses.service';

@Injectable()
export class CommentsService {
  constructor(
    private readonly commentRepository: CommentsRepository,
    private readonly postRepository: PostsRepository,
    private readonly sesService: SESService,
  ) {}

  async getComment(id: string) {
    const comment = await this.commentRepository.findCommentById(id);
    if (!comment || comment.deletedAt)
      throw new AppErrorException('NotFound', 'Comment not found');
    return comment;
  }

  async getComments(postId: string, userId: string | null) {
    const comments = await this.commentRepository.findComments(postId);

    const commentLikeMap = userId
      ? await this.getCommentLikeMap({
          commentIds: comments.map((comment) => comment.id),
          userId,
        })
      : {};

    const commentsWithIsLiked = comments.map((comment) => {
      return { ...comment, isLiked: !!commentLikeMap[comment.id] };
    });

    const hidedDeletedComments = this.hideDeletedComments(commentsWithIsLiked);
    const groupedComments = this.groupSubcomments(hidedDeletedComments);

    return groupedComments;
  }

  private groupSubcomments<T extends Comment>(comments: T[]) {
    const rootComments = comments.filter((comment) => !comment.parentCommentId);
    const subcommentsMap = new Map<string, T[]>(); // key: parentCommentId, value: subcomment

    comments.forEach((comment) => {
      // skip root comments
      if (!comment.parentCommentId) return;
      // skip deleted comments that is not root
      if (comment.deletedAt !== null) return;
      const subcomments = subcommentsMap.get(comment.parentCommentId) ?? [];
      subcomments.push(comment);
      subcommentsMap.set(comment.parentCommentId, subcomments);
    });

    const groupedComments = rootComments
      .map((comment) => {
        const subcomments = subcommentsMap.get(comment.id) ?? [];
        return { ...comment, subcomments };
      })
      // filter out deleted comments that has no subcomments
      .filter((c) => c.deletedAt === null || c.subcomments.length !== 0);

    return groupedComments;
  }

  private hideDeletedComments(comments: Comment[]) {
    return comments.map((comment) => {
      if (!comment.deletedAt) return { ...comment, isDeleted: false };
      const someDate = new Date(0);
      return {
        ...comment,
        likes: 0,
        subcommentsCount: 0,
        text: '',
        userId: '',
        user: {
          id: '',
          username: '',
          displayName: '',
        },
        createdAt: someDate,
        updatedAt: someDate,
        isDeleted: true,
      };
    });
  }

  async createComment(dto: CreateCommentDto, userId: string) {
    const post = await this.postRepository.findPostById(dto.postId);
    if (!post) throw new AppErrorException('NotFound', 'Post not found');

    if (dto.text.length > 300 || dto.text.length === 0) {
      throw new AppErrorException(
        'BadRequest',
        'Comment text must be between 1 and 300 characters',
      );
    }

    // rootComment의 level이 0이라고 할 때, 현재 comment의 level을 확인하는 과정.
    const parentComment = dto.parentCommentId
      ? await this.getComment(dto.parentCommentId)
      : null;

    // level이 2인 경우, rootComment의 id를 parentCommentId로 설정
    // 즉 comment의 level은 0, 1로 제한
    const rootParentCommentId = parentComment?.parentCommentId;
    const targetParentCommentId = rootParentCommentId ?? dto.parentCommentId;
    dto.parentCommentId = targetParentCommentId;

    const comment = await this.commentRepository.createComment(dto, userId);

    // update parent comment's subcomment count if it has parent
    if (dto.parentCommentId) {
      const subcommentsCount = await this.commentRepository.countSubcomments(
        targetParentCommentId,
      );

      await this.commentRepository.updateSubcommentCount(
        targetParentCommentId,
        subcommentsCount,
      );
    }

    await this.countAndSyncComments(dto.postId);

    // notify to post author and parent comment author

    try {
      const nofifyToPostAuthor = async () => {
        if (!post.user.email) return; // don't notify to user who doesn't have email
        if (post.user.id === userId) return; // don't notify to myself

        const body = this.sesService.createCommentEmail({
          postAuthor: post.user.username,
          postTitle: post.title,
          postSlug: post.slug,
          commentUsername: comment.user.username,
          profileImage: comment.user.profileImage,
          commentText: comment.text,
        });

        await this.sesService.sendEmail({
          to: post.user.email,
          subject: `Re: ${post.title} - New Comment On Your Post!`,
          body,
          from: `no-reply@wap-dev.store`,
        });
      };
      const notifyToParentCommenter = async () => {
        let to: string;
        if (comment.mentionUser) {
          if (!comment.mentionUser.email) return; // don't notify to user who doesn't have email
          if (comment.mentionUser.id === userId) return; // don't notify to myself

          to = comment.mentionUser.email;
        } else if (parentComment) {
          if (!parentComment.user.email) return; // don't notify to user who doesn't have email
          if (parentComment.user.id === userId) return; // don't notify to myself

          to = parentComment.user.email;
        } else {
          return; // don't notify if it's root comment
        }

        const body = this.sesService.createCommentEmail({
          postAuthor: post.user.username,
          postTitle: post.title,
          postSlug: post.slug,
          commentUsername: comment.user.username,
          profileImage: comment.user.profileImage,
          commentText: comment.text,
        });

        await this.sesService.sendEmail({
          to,
          subject: `Re: ${post.title} - New Reply On Your Comment!`,
          body,
          from: `no-reply@wap-dev.store`,
        });
      };

      await Promise.all([nofifyToPostAuthor(), notifyToParentCommenter()]);
    } catch (error) {}

    return { ...comment, isDeleted: false, subcomments: [], isLiked: false };
  }

  async deleteComment(id: string, userId: string) {
    const comment = await this.getComment(id);
    if (comment.userId !== userId)
      throw new AppErrorException('Forbidden', "Can't delete other's comment");

    await this.commentRepository.deleteComment(id);

    this.countAndSyncComments(comment.postId);
  }

  async likeComment({ commentId, userId }: CommentActionParams) {
    const alreadyLiked = await this.commentRepository.findCommentLike(
      commentId,
      userId,
    );
    if (!alreadyLiked) {
      await this.commentRepository.createCommentLike(commentId, userId);
    }

    const likes = await this.updateCommentLikes(commentId);
    return likes;
  }

  async unlikeComment({ commentId, userId }: CommentActionParams) {
    const alreadyLiked = await this.commentRepository.findCommentLike(
      commentId,
      userId,
    );
    if (alreadyLiked) {
      await this.commentRepository.deleteCommentLike(commentId, userId);
    }

    const likes = await this.updateCommentLikes(commentId);
    return likes;
  }

  async updateCommentLikes(commentId: string) {
    const likes = await this.commentRepository.countCommentLikes(commentId);
    await this.commentRepository.updateCommentLikes(commentId, likes);

    return likes;
  }

  async getCommentLikeMap({ commentIds, userId }: GetCommentLikedParams) {
    const list = await this.commentRepository.findCommentLikes(
      commentIds,
      userId,
    );

    return list.reduce((acc, { commentId, userId }) => {
      acc[commentId] = userId;
      return acc;
    }, {} as Record<string, string>);
  }

  async countAndSyncComments(postId: string) {
    const commentsCount = await this.commentRepository.countComments(postId);
    await this.postRepository.updatePostCommentsCount(postId, commentsCount);

    return commentsCount;
  }
}

interface GetCommentLikedParams {
  commentIds: string[];
  userId: string;
}

interface CommentActionParams {
  commentId: string;
  userId: string;
}

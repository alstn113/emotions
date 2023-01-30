import { HttpException, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentsRepository } from './comments.repository';
import { Comment } from '@prisma/client';

@Injectable()
export class CommentsService {
  constructor(private readonly commentRepository: CommentsRepository) {}

  async getComment(id: string) {
    const comment = await this.commentRepository.findCommentById(id);
    if (!comment || comment.deletedAt) throw new HttpException('Comment not found', 404);
    return comment;
  }

  async getComments(postId: string) {
    const comments = await this.commentRepository.findComments(postId);

    const hidedDeletedComments = this.hideDeletedComments(comments);
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
    const comment = await this.commentRepository.createComment(dto, userId);
    return { ...comment, isDeleted: false, subcomments: [] };
  }

  async deleteComment(id: string, userId: string) {
    const comment = await this.getComment(id);
    if (comment.userId !== userId)
      throw new HttpException('You are not the author of this comment', 403);

    await this.commentRepository.deleteComment(id);
  }

  async likeComment(commentId: string, userId: string) {
    const alreadyLiked = await this.commentRepository.findCommentLike(commentId, userId);
    if (!alreadyLiked) {
      await this.commentRepository.createCommentLike(commentId, userId);
    }

    const likes = await this.updateCommentLikes(commentId);
    return likes;
  }

  async unlikeComment(commentId: string, userId: string) {
    const alreadyLiked = await this.commentRepository.findCommentLike(commentId, userId);
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
}

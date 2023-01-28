import { HttpException, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentsRepository } from './comments.repository';
import { Comment } from '@prisma/client';

@Injectable()
export class CommentsService {
  constructor(private readonly commentRepository: CommentsRepository) {}

  async getComments(postId: string) {
    const comments = await this.commentRepository.findComments(postId);

    const groupedComments = this.groupSubcomments(comments);

    return groupedComments;
  }

  private groupSubcomments(comments: Comment[]) {
    const rootComments = comments.filter((comment) => !comment.parentCommentId);
    const subcommentsMap = new Map<string, Comment[]>(); // key: parentCommentId, value: subcomment

    comments.forEach((comment) => {
      if (!comment.parentCommentId) return;
      const subcomments = subcommentsMap.get(comment.parentCommentId) ?? [];
      subcomments.push(comment);
      subcommentsMap.set(comment.parentCommentId, subcomments);
    });

    const groupedComments = rootComments.map((comment) => {
      const subcomments = subcommentsMap.get(comment.id) ?? [];
      return { ...comment, subcomments };
    });

    return groupedComments;
  }

  async createComment(dto: CreateCommentDto, authorId: string) {
    return await this.commentRepository.createComment(dto, authorId);
  }

  async deleteComment(id: string, userId: string) {
    const comment = await this.commentRepository.findCommentById(id);
    if (!comment) throw new HttpException('Comment not found', 404);
    if (comment.userId !== userId)
      throw new HttpException('You are not the author of this comment', 403);
    return await this.commentRepository.deleteComment(id);
  }
}

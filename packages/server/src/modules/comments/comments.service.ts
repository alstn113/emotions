import { HttpException, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentsRepository } from './comments.repository';

@Injectable()
export class CommentsService {
  constructor(private readonly commentRepository: CommentsRepository) {}

  async getComments(postId: string) {
    return await this.commentRepository.findComments(postId);
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

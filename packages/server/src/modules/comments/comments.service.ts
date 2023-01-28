import { Injectable } from '@nestjs/common';
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

  async deleteComment(id: string) {
    return await this.commentRepository.deleteComment(id);
  }
}

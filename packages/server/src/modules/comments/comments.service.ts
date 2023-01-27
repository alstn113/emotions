import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentsRepository } from './comments.repository';

@Injectable()
export class CommentsService {
  constructor(private readonly commentRepository: CommentsRepository) {}
  async getComments() {
    return await this.commentRepository.findComments();
  }

  async getCommentById(id: string) {
    return await this.commentRepository.findCommentById(id);
  }

  async createComment(dto: CreateCommentDto, authorId: string) {
    return await this.commentRepository.createComment(dto, authorId);
  }

  async deleteComment(id: string) {
    return await this.commentRepository.deleteComment(id);
  }
}

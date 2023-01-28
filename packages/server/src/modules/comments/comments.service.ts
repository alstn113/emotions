import { HttpException, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentsRepository } from './comments.repository';
import { PostsService } from '../posts/posts.service';

@Injectable()
export class CommentsService {
  constructor(
    private readonly commentRepository: CommentsRepository,
    private readonly postService: PostsService,
  ) {}
  async getComments(postId: string) {
    const post = await this.postService.getPostById(postId);
    if (!post) throw new HttpException('Post not found', 404);

    return await this.commentRepository.findComments(postId);
  }

  async createComment(dto: CreateCommentDto, postId: string, authorId: string) {
    return await this.commentRepository.createComment(dto, postId, authorId);
  }

  async deleteComment(id: string) {
    return await this.commentRepository.deleteComment(id);
  }
}

import { HttpException, Injectable } from '@nestjs/common';
import { CommentsService } from '../comments/comments.service';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsRepository } from './posts.repository';

@Injectable()
export class PostsService {
  constructor(
    private readonly postRepository: PostsRepository,
    private readonly commentsService: CommentsService,
  ) {}
  async getPosts() {
    return await this.postRepository.findPosts();
  }

  async getPostById(id: string) {
    const post = await this.postRepository.findPostById(id);
    if (!post) throw new HttpException('Post not found', 404);
    return post;
  }

  async createPost(dto: CreatePostDto, authorId: string) {
    return await this.postRepository.createPost(dto, authorId);
  }

  async likePost(id: string, userId: string) {
    return;
  }

  async unlikePost(id: string, userId: string) {
    return;
  }

  async deletePost(id: string, authorId: string) {
    const post = await this.getPostById(id);
    if (post.authorId !== authorId)
      throw new HttpException('You are not the author of this post', 403);
    await this.postRepository.deletePost(id);
  }

  async getPostComments(id: string) {
    return await this.commentsService.getComments(id);
  }
}

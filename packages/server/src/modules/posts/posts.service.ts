import { HttpException, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsRepository } from './posts.repository';

@Injectable()
export class PostsService {
  constructor(private readonly postRepository: PostsRepository) {}
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

  async deletePost(id: string, authorId: string) {
    const post = await this.postRepository.findPostById(id);
    if (!post) throw new HttpException('Post not found', 404);
    if (post.authorId !== authorId)
      throw new HttpException('You are not the author of this post', 403);
    return await this.postRepository.deletePost(id);
  }
}

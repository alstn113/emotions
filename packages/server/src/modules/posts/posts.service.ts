import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsRepository } from './posts.repository';

@Injectable()
export class PostsService {
  constructor(private readonly postRepository: PostsRepository) {}
  async getPosts() {
    return await this.postRepository.findPosts();
  }

  async getPostById(id: string) {
    return await this.postRepository.findPostById(id);
  }

  async createPost(dto: CreatePostDto, authorId: string) {
    return await this.postRepository.createPost(dto, authorId);
  }

  async deletePost(id: string) {
    return await this.postRepository.deletePost(id);
  }
}

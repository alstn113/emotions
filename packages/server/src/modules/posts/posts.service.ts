import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto';
import { PostsRepository } from './posts.repository';

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostsRepository) {}

  async getPostById(id: string) {
    return await this.postsRepository.findPostById(id);
  }

  async getPosts() {
    return await this.postsRepository.findPosts();
  }

  async createPost(dto: CreatePostDto) {
    return await this.postsRepository.createPost(dto);
  }

  async deletePostById(id: string) {
    return await this.postsRepository.deletePostById(id);
  }
}

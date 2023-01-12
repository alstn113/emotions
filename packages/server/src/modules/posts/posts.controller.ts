import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dto';
import { PostsService } from './posts.service';

@ApiTags('/posts')
@Controller('/posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('/:id')
  async getPostById(@Param('id') id: string) {
    return await this.postsService.getPostById(id);
  }

  @Get('/')
  async getPosts() {
    return await this.postsService.getPosts();
  }

  @Post('/')
  async createPost(@Body() dto: CreatePostDto) {
    return this.postsService.createPost(dto);
  }

  @Delete('/:id')
  async deletePost(@Param('id') id: string) {
    return this.postsService.deletePostById(id);
  }
}

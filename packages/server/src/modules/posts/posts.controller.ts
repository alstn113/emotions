import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { GetCurrentUser } from '~/common/decorators';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getPosts() {
    return await this.postsService.getPosts();
  }

  @Get(':id')
  async getPostById(@Param('id') id: string) {
    return this.postsService.getPostById(id);
  }

  @Post()
  async createPost(@Body() dto: CreatePostDto, @GetCurrentUser('userId') userId: string) {
    return await this.postsService.createPost(dto, userId);
  }

  @Delete(':id')
  async deletePost(@Param('id') id: string) {
    return await this.postsService.deletePost(id);
  }
}

import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { GetCurrentUser, Public } from '~/common/decorators';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Public()
  @Get()
  async getPosts() {
    return await this.postsService.getPosts();
  }

  @Public()
  @Get(':id')
  async getPost(@Param('id') id: string, @GetCurrentUser('userId') userId: string | null) {
    return this.postsService.getPost(id, userId);
  }

  @Public()
  @Get(':id/comments')
  async getPostComments(@Param('id') id: string) {
    return await this.postsService.getPostComments(id);
  }

  @Post()
  async createPost(@Body() dto: CreatePostDto, @GetCurrentUser('userId') userId: string) {
    return await this.postsService.createPost(dto, userId);
  }

  @Post(':id/likes')
  async likePost(@Param('id') id: string, @GetCurrentUser('userId') userId: string) {
    return await this.postsService.likePost(id, userId);
  }

  @Delete(':id/likes')
  async unlikePost(@Param('id') id: string, @GetCurrentUser() userId: string) {
    return await this.postsService.unlikePost(id, userId);
  }

  @Delete(':id')
  async deletePost(
    @Param('id') id: string,
    @GetCurrentUser('userId') userId: string,
  ): Promise<void> {
    return await this.postsService.deletePost(id, userId);
  }
}

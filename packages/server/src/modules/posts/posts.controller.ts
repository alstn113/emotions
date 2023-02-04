import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
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
  async getPosts(
    @Query('cursor') cursor: string | null,
    @GetCurrentUser('userId') userId: string | null,
  ) {
    return await this.postsService.getPosts(cursor ?? null, userId ?? null);
  }

  @Public()
  @Get(':id')
  async getPost(
    @GetCurrentUser('userId') userId: string | null,
    @Param('id') id: string,
  ) {
    return this.postsService.getPost(id, userId);
  }

  @Public()
  @Get(':id/comments')
  async getPostComments(
    @Param('id') id: string,
    @GetCurrentUser('userId') userId: string | null,
  ) {
    return await this.postsService.getPostComments(id, userId);
  }

  @Post()
  async createPost(
    @Body() dto: CreatePostDto,
    @GetCurrentUser('userId') userId: string,
  ) {
    return await this.postsService.createPost(dto, userId);
  }

  @Post(':id/likes')
  async likePost(
    @Param('id') id: string,
    @GetCurrentUser('userId') userId: string,
  ) {
    return await this.postsService.likePost(id, userId);
  }

  @Delete(':id/likes')
  async unlikePost(
    @Param('id') id: string,
    @GetCurrentUser('userId') userId: string,
  ) {
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

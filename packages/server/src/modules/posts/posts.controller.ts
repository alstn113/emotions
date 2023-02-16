import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { GetCurrentUser, Public } from '~/common/decorators';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import multerOptions from '~/lib/multer';
import { GetPostsQueryDto } from './dto/get-post-query.dto';
import { plainToInstance } from 'class-transformer';
import { PaginatedPostsDto, PostDto, PostStatsDto } from './dto';
import { CommentDto } from '../comments/dto';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Public()
  @Get()
  async getPosts(
    @Query() dto: GetPostsQueryDto,
    @GetCurrentUser('userId') userId: string | null,
  ): Promise<PaginatedPostsDto> {
    const paginatedPosts = await this.postsService.getPosts(dto, userId);
    return plainToInstance(PaginatedPostsDto, paginatedPosts, {
      excludeExtraneousValues: true,
    });
  }

  @Public()
  @Get('slug/:slug')
  async getPostBySlug(
    @Param('slug') slug: string,
    @GetCurrentUser('userId') userId: string | null,
  ): Promise<PostDto> {
    const post = await this.postsService.getPostBySlug({ slug, userId });
    return plainToInstance(PostDto, post, {
      excludeExtraneousValues: true,
    });
  }

  @Public()
  @Get(':id')
  async getPost(
    @GetCurrentUser('userId') userId: string | null,
    @Param('id') id: string,
  ) {
    const post = await this.postsService.getPost(id, userId);
    return plainToInstance(PostDto, post, {
      excludeExtraneousValues: true,
    });
  }

  @Public()
  @Get(':id/comments')
  async getPostComments(
    @Param('id') id: string,
    @GetCurrentUser('userId') userId: string | null,
  ): Promise<CommentDto[]> {
    const postComments = await this.postsService.getPostComments(id, userId);
    return plainToInstance(CommentDto, postComments, {
      excludeExtraneousValues: true,
    });
  }

  @Post()
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async createPost(
    @Body() dto: CreatePostDto,
    @GetCurrentUser('userId') userId: string,
  ): Promise<PostDto> {
    const post = await this.postsService.createPost(dto, userId);
    return plainToInstance(PostDto, post, {
      excludeExtraneousValues: true,
    });
  }

  @Post(':postId/likes')
  async likePost(
    @Param('postId') postId: string,
    @GetCurrentUser('userId') userId: string,
  ): Promise<PostStatsDto> {
    const postStats = await this.postsService.likePost({ postId, userId });
    return plainToInstance(PostStatsDto, postStats, {
      excludeExtraneousValues: true,
    });
  }

  @Delete(':postId/likes')
  async unlikePost(
    @Param('postId') postId: string,
    @GetCurrentUser('userId') userId: string,
  ): Promise<PostStatsDto> {
    const postStats = await this.postsService.unlikePost({ postId, userId });
    return plainToInstance(PostStatsDto, postStats, {
      excludeExtraneousValues: true,
    });
  }

  @Delete(':postId')
  async deletePost(
    @Param('postId') postId: string,
    @GetCurrentUser('userId') userId: string,
  ): Promise<void> {
    return await this.postsService.deletePost({ postId, userId });
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<string> {
    return await this.postsService.uploadImage(file);
  }
}

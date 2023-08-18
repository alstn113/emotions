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
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';

import { plainToInstance } from 'class-transformer';

import {
  PaginatedPostsDto,
  PostDto,
  PostStatsDto,
  GetPostsQueryDto,
  CreatePostDto,
  GetSearchPostsQueryDto,
  SearchPostsDto,
} from './dto';
import { PostsService } from './posts.service';
import { CurrentUser, GetCurrentUser, Public } from '../../common/decorators';
import multerOptions from '../../lib/multer';
import { CommentListResponseDto } from '../comments/dto';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Public()
  @Get()
  async getPosts(
    @Query() dto: GetPostsQueryDto,
    @GetCurrentUser('userId') userId: CurrentUser<'userId'> | null,
  ): Promise<PaginatedPostsDto> {
    const paginatedPosts = await this.postsService.getPosts(dto, userId);
    return plainToInstance(PaginatedPostsDto, paginatedPosts);
  }

  @Public()
  @Get('username/:username')
  async getPostsByUsername(
    @Param('username') username: string,
    @Query() dto: GetPostsQueryDto,
    @GetCurrentUser('userId') userId: CurrentUser<'userId'> | null,
  ): Promise<PaginatedPostsDto> {
    const paginatedPosts = await this.postsService.getPostsByUsername(
      dto,
      username,
      userId,
    );
    return plainToInstance(PaginatedPostsDto, paginatedPosts);
  }

  @Public()
  @Get('/username/:username/slug/:slug')
  async getPostBySlug(
    @Param('username') username: string,
    @Param('slug') slug: string,
    @GetCurrentUser('userId') userId: CurrentUser<'userId'> | null,
  ): Promise<PostDto> {
    const post = await this.postsService.getPostBySlug({
      username,
      slug,
      userId,
    });
    return plainToInstance(PostDto, post);
  }

  @Public()
  @Get('search')
  async getSearchPosts(
    @Query() dto: GetSearchPostsQueryDto,
  ): Promise<SearchPostsDto> {
    const posts = await this.postsService.getSearchPosts(dto);
    return plainToInstance(SearchPostsDto, posts);
  }

  @Public()
  @Get(':id')
  async getPost(
    @GetCurrentUser('userId') userId: CurrentUser<'userId'> | null,
    @Param('id') id: string,
  ) {
    const post = await this.postsService.getPost(id, userId);
    return plainToInstance(PostDto, post);
  }

  @Public()
  @Get(':id/comments')
  async getCommentList(
    @Param('id') id: string,
    @GetCurrentUser('userId') userId: CurrentUser<'userId'> | null,
  ): Promise<CommentListResponseDto> {
    const commentList = await this.postsService.getCommentList(id, userId);
    return plainToInstance(CommentListResponseDto, commentList);
  }

  @Post()
  async createPost(
    @Body() dto: CreatePostDto,
    @GetCurrentUser() user: CurrentUser,
  ): Promise<PostDto> {
    const post = await this.postsService.createPost(dto, user);

    return plainToInstance(PostDto, post);
  }

  @Post(':postId/likes')
  async likePost(
    @Param('postId') postId: string,
    @GetCurrentUser('userId') userId: CurrentUser<'userId'>,
  ): Promise<PostStatsDto> {
    const postStats = await this.postsService.likePost({ postId, userId });
    return plainToInstance(PostStatsDto, postStats);
  }

  @Delete(':postId/likes')
  async unlikePost(
    @Param('postId') postId: string,
    @GetCurrentUser('userId') userId: CurrentUser<'userId'>,
  ): Promise<PostStatsDto> {
    const postStats = await this.postsService.unlikePost({ postId, userId });
    return plainToInstance(PostStatsDto, postStats);
  }

  @Delete(':postId')
  async deletePost(
    @Param('postId') postId: string,
    @GetCurrentUser('userId') userId: CurrentUser<'userId'>,
  ): Promise<void> {
    return await this.postsService.deletePost({ postId, userId });
  }

  @Post('image')
  @UseInterceptors(FileInterceptor('image', multerOptions))
  async uploadImage(
    @UploadedFile() image: Express.Multer.File,
  ): Promise<string> {
    return await this.postsService.uploadImage(image);
  }
}

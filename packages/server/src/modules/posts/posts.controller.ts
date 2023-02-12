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

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Public()
  @Get()
  async getPosts(
    @Query() dto: GetPostsQueryDto,
    @GetCurrentUser('userId') userId: string | null,
  ) {
    return await this.postsService.getPosts(dto, userId);
  }

  @Public()
  @Get(':slug')
  async getPostBySlug(
    @Param('slug') slug: string,
    @GetCurrentUser('userId') userId: string | null,
  ) {
    return await this.postsService.getPostBySlug({ slug, userId });
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
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async createPost(
    @Body() dto: CreatePostDto,
    @GetCurrentUser('userId') userId: string,
  ) {
    return await this.postsService.createPost(dto, userId);
  }

  @Post(':postId/likes')
  async likePost(
    @Param('postId') postId: string,
    @GetCurrentUser('userId') userId: string,
  ) {
    return await this.postsService.likePost({ postId, userId });
  }

  @Delete(':postId/likes')
  async unlikePost(
    @Param('postId') postId: string,
    @GetCurrentUser('userId') userId: string,
  ) {
    return await this.postsService.unlikePost({ postId, userId });
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
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    return await this.postsService.uploadImage(file);
  }
}

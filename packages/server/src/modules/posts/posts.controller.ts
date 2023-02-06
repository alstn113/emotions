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
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import multerOptions from '~/utils/multerOptions';
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
    return await this.postsService.getPosts(dto.cursor ?? null, userId ?? null);
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
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        body: { type: 'string' },
        tags: { type: 'array', items: { type: 'string' } },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async createPost(
    @Body() dto: CreatePostDto,
    @GetCurrentUser('userId') userId: string,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return await this.postsService.createPost(dto, userId, file);
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

import { Controller, Post, Body, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { plainToInstance } from 'class-transformer';

import { CommentsService } from './comments.service';
import { CommentDto, CreateCommentDto } from './dto';
import { GetCurrentUser } from '../../common/decorators';

@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  async createComment(
    @Body() dto: CreateCommentDto,
    @GetCurrentUser('userId') userId: string,
  ): Promise<CommentDto> {
    const comment = await this.commentsService.createComment(dto, userId);
    return plainToInstance(CommentDto, comment);
  }

  @Delete(':id')
  async deleteComment(
    @Param('id') id: string,
    @GetCurrentUser('userId') userId: string,
  ): Promise<void> {
    await this.commentsService.deleteComment(id, userId);
  }

  @Post(':commentId/likes')
  async likeComment(
    @Param('commentId') commentId: string,
    @GetCurrentUser('userId') userId: string,
  ): Promise<number> {
    return await this.commentsService.likeComment({ commentId, userId });
  }

  @Delete(':commentId/likes')
  async unlikeComment(
    @Param('commentId') commentId: string,
    @GetCurrentUser('userId') userId: string,
  ): Promise<number> {
    return await this.commentsService.unlikeComment({ commentId, userId });
  }
}

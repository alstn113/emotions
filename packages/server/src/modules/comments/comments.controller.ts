import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { GetCurrentUser } from '~/common/decorators';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get(':postId')
  async getComments(@Param('postId') postId: string) {
    return await this.commentsService.getComments(postId);
  }

  @Post(':postId')
  async createComment(
    @Param('postId') postId: string,
    @Body() dto: CreateCommentDto,
    @GetCurrentUser('userId') userId: string,
  ) {
    return await this.commentsService.createComment(dto, postId, userId);
  }

  @Delete(':id')
  async deleteComment(@Param('id') id: string) {
    return await this.commentsService.deleteComment(id);
  }
}

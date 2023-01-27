import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { GetCurrentUser } from '~/common/decorators';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  async getComments() {
    return await this.commentsService.getComments();
  }

  @Get(':id')
  async getCommentById(@Param('id') id: string) {
    return this.commentsService.getCommentById(id);
  }

  @Post()
  async createComment(@Body() dto: CreateCommentDto, @GetCurrentUser('userId') userId: string) {
    return await this.commentsService.createComment(dto, userId);
  }

  @Delete(':id')
  async deleteComment(@Param('id') id: string) {
    return await this.commentsService.deleteComment(id);
  }
}

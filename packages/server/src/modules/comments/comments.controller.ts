import { Controller, Post, Body, Param, Delete } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { GetCurrentUser } from '~/common/decorators';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  async createComment(@Body() dto: CreateCommentDto, @GetCurrentUser('userId') userId: string) {
    return await this.commentsService.createComment(dto, userId);
  }

  @Delete(':id')
  async deleteComment(@Param('id') id: string, @GetCurrentUser('userId') userId: string) {
    return await this.commentsService.deleteComment(id, userId);
  }
}

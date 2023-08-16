import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { CommentsRepository } from './comments.repository';
import { PostsRepository } from '../posts/posts.repository';
import { SESService } from '../../providers/aws/ses/ses.service';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService, CommentsRepository, PostsRepository, SESService],
})
export class CommentsModule {}

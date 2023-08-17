import { Module } from '@nestjs/common';

import { CommentsController } from './comments.controller';
import { CommentsRepository } from './comments.repository';
import { CommentsService } from './comments.service';
import { SESService } from '../../providers/aws/ses/ses.service';
import { PostsRepository } from '../posts/posts.repository';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService, CommentsRepository, PostsRepository, SESService],
})
export class CommentsModule {}

import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { CommentsRepository } from './comments.repository';
import { PostsService } from '../posts/posts.service';
import { PostsRepository } from '../posts/posts.repository';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService, CommentsRepository, PostsService, PostsRepository],
})
export class CommentsModule {}

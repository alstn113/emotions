import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PostsRepository } from './posts.repository';
import { CommentsRepository } from '../comments/comments.repository';
import { CommentsService } from '../comments/comments.service';

@Module({
  controllers: [PostsController],
  providers: [
    PostsService,
    PostsRepository,
    CommentsService,
    CommentsRepository,
  ],
})
export class PostsModule {}

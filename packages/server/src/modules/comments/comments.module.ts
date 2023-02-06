import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { CommentsRepository } from './comments.repository';
import { PostsRepository } from '../posts/posts.repository';
import { S3Service } from '~/providers/aws/s3/s3.service';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService, CommentsRepository, PostsRepository, S3Service],
})
export class CommentsModule {}

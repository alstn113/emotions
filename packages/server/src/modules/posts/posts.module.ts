import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PostsRepository } from './posts.repository';
import { CommentsRepository } from '../comments/comments.repository';
import { CommentsService } from '../comments/comments.service';
import { S3Service } from '~/providers/aws/s3/s3.service';
import { SeriesService } from '../series/series.service';
import { SeriesRepository } from '../series/series.repository';
import { SESService } from '~/providers/aws/ses/ses.service';

@Module({
  controllers: [PostsController],
  providers: [
    PostsService,
    PostsRepository,
    CommentsService,
    CommentsRepository,
    S3Service,
    SeriesService,
    SeriesRepository,
    SESService,
  ],
})
export class PostsModule {}

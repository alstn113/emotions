import { Module } from '@nestjs/common';

import { PostsController } from './posts.controller';
import { PostsRepository } from './posts.repository';
import { PostsService } from './posts.service';
import { S3Service } from '../../providers/aws/s3/s3.service';
import { SESService } from '../../providers/aws/ses/ses.service';
import { CommentsRepository } from '../comments/comments.repository';
import { CommentsService } from '../comments/comments.service';
import { SeriesRepository } from '../series/series.repository';
import { SeriesService } from '../series/series.service';

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

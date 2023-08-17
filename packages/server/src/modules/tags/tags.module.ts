import { Module } from '@nestjs/common';

import { TagsController } from './tags.controller';
import { TagsRepository } from './tags.repository';
import { TagsService } from './tags.service';
import { S3Service } from '../../providers/aws/s3/s3.service';
import { PostsRepository } from '../posts/posts.repository';

@Module({
  controllers: [TagsController],
  providers: [TagsService, TagsRepository, PostsRepository, S3Service],
})
export class TagsModule {}

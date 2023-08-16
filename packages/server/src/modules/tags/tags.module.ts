import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { TagsRepository } from './tags.repository';
import { PostsRepository } from '../posts/posts.repository';
import { S3Service } from '../../providers/aws/s3/s3.service';

@Module({
  controllers: [TagsController],
  providers: [TagsService, TagsRepository, PostsRepository, S3Service],
})
export class TagsModule {}

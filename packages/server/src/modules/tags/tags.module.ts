import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { TagsRepository } from './tags.repository';
import { PostsRepository } from '../posts/posts.repository';

@Module({
  controllers: [TagsController],
  providers: [TagsService, TagsRepository, PostsRepository],
})
export class TagsModule {}

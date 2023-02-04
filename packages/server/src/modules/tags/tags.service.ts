import { Injectable } from '@nestjs/common';
import { TagsRepository } from './tags.repository';
import { PostsRepository } from '../posts/posts.repository';

@Injectable()
export class TagsService {
  constructor(
    private readonly commentRepository: TagsRepository,
    private readonly postRepository: PostsRepository,
  ) {}
}

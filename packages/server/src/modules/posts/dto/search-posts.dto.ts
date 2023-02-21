import { Expose, Type } from 'class-transformer';
import { PostDto } from './post.dto';

export class SearchPostsDto {
  @Expose()
  @Type(() => PostDto)
  posts: PostDto[];

  @Expose()
  count: number;
}

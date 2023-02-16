import { Expose, Type } from 'class-transformer';
import { PostDto } from './post.dto';

export class PaginatedPostsDto {
  @Expose()
  @Type(() => PostDto)
  list: PostDto[];

  @Expose()
  totalCount: number;

  @Expose()
  pageInfo: {
    endCursor: string | null;
    hasNextPage: boolean;
  };
}

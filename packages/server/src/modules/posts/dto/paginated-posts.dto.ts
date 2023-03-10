import { Exclude, Expose, Type } from 'class-transformer';
import { PostDto } from './post.dto';

@Exclude()
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

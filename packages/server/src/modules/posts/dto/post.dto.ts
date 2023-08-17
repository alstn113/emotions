import { Exclude, Expose, Type } from 'class-transformer';

import { PostStatsDto } from './post-stats.dto';
import { SeriesDto } from '../../../modules/series/dto';
import { UserDto } from '../../../modules/users/dto';

@Exclude()
export class PostDto {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  slug: string;

  @Expose()
  description: string;

  @Expose()
  body: string;

  @Expose()
  userId: string;

  @Expose()
  thumbnail: string | null;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  @Type(() => UserDto)
  user: UserDto;

  @Expose()
  tags: string[];

  @Expose()
  @Type(() => PostStatsDto)
  postStats: PostStatsDto;

  @Expose()
  @Type(() => SeriesDto)
  series: SeriesDto;

  @Expose()
  isLiked: boolean;
}

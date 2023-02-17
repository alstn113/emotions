import { Expose } from 'class-transformer';

export class PostStatsDto {
  @Expose()
  likes: number;

  @Expose()
  comments: number;

  @Expose()
  commentsCount: number;
}

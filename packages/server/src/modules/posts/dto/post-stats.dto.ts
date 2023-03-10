import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class PostStatsDto {
  @Expose()
  likes: number;

  @Expose()
  comments: number;

  @Expose()
  commentsCount: number;
}

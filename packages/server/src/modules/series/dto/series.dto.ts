import { Exclude, Expose, Type } from 'class-transformer';
import { SeriesPostDto } from './series-post.dto';

@Exclude()
export class SeriesDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  postsCount: number;

  @Expose()
  userId: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  @Type(() => SeriesPostDto)
  seriesPosts: SeriesPostDto[];
}

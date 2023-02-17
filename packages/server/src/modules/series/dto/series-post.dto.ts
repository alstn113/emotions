import { Expose } from 'class-transformer';

export class SeriesPostDto {
  @Expose()
  id: string;

  @Expose()
  index: number;

  @Expose()
  seriesId: string;

  @Expose()
  postId: string;

  @Expose()
  post: {
    id: string;
    title: string;
    slug: string;
    thumbnail: string | null;
  };
}

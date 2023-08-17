import { Post } from './post';

export interface CreateSeriesParams {
  name: string;
}

export type SeriesList = Series[];

export interface Series {
  id: string;
  name: string;
  postsCount: number;
  userId: string;
  seriesPosts: SeriesPost[];
  createdAt: string;
  updatedAt: string;
}

export interface SeriesPost {
  id: string;
  index: number;
  post: Post;
  createdAt: string;
  updatedAt: string;
}

export interface AppendToPostSeriesParams {
  seriesId: string;
  postId: string;
}

export interface EditSeriesParams {
  seriesId: string;
  name: string;
  seriesOrder: string[];
}

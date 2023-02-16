export interface User {
  id: string;
  username: string;
  displayName: string;
}

export interface PostList {
  list: PostWithStats[];
  totalCount: number;
  pageInfo: {
    endCursor: string | null;
    hasNextPage: boolean;
  };
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  description: string;
  body: string;
  thumbnail?: string;
  userId: string;
  user: User;
  comments: Comment[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface SinglePostReponse extends PostWithStats {
  series: Series | null;
}

export interface PostStats {
  id: string;
  likes: number;
  commentsCount: number;
}

export interface PostWithStats extends Post {
  postStats: PostStats;
  isLiked: boolean;
}

export interface Comment {
  id: string;
  text: string;
  userId: string;
  postId: string;
  subcommentsCount: number;
  likes: number;
  user: User;
  post: Post;
  subcomments?: Comment[];
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  isLiked: boolean;
  isDeleted: boolean;
}

export interface CreatePostParams {
  title: string;
  body: string;
  slug?: string;
  description?: string;
  thumbnail: string | null;
  tags?: string[];
  seriesId?: string;
}

export interface CreateCommentParams {
  text: string;
  postId: string;
  parentCommentId?: string;
}

export interface CreateSeriesParams {
  name: string;
}

export type SeriesList = Series[];

export interface Series {
  id: string;
  name: string;
  postsCount: 0;
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

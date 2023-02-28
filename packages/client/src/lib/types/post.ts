import { Series } from './series';
import { User } from './user';

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
  series?: Series;
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

export interface SearchPostResponse {
  posts: PostWithStats[];
  count: number;
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

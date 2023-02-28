import { Post } from './post';
import { User } from './user';

export interface Comment {
  id: string;
  text: string;
  userId: string;
  mentionUserId?: string;
  postId: string;
  subcommentsCount: number;
  likes: number;
  user: User;
  mentionUser?: User;
  post: Post;
  subcomments?: Comment[];
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  isLiked: boolean;
  isDeleted: boolean;
}

export interface CommentListResponse {
  list: Comment[];
  totalCount: number;
}

export interface CreateCommentParams {
  text: string;
  postId: string;
  parentCommentId?: string;
  mentionUserId?: string;
}

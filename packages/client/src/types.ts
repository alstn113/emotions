import { number } from 'yup';

export interface User {
  id: string;
  username: string;
  displayName: string;
}
export interface Room {
  id: string;
  name: string;
  user: User;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Post {
  id: string;
  title: string;
  body: string;
  userId: string;
  user: User;
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
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
  user: User;
  postId: string;
  post: Post;
  subcomments?: Comment[];
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  isDeleted: boolean;
}

export interface CreateRoomParams {
  name: string;
}

export interface CreatePostParams {
  title: string;
  body: string;
}

export interface CreateCommentParams {
  text: string;
  postId: string;
  parentCommentId?: string;
}

export interface MessagePayload {
  uid: string;
  username: string;
  message: string;
}

export interface TypingStatusPayload {
  uid: string;
  username: string;
  isTyping: boolean;
}

export interface User {
  id: string;
  username: string;
  displayName: string;
  createdAt: string;
  updatedAt: string;
}
export interface Room {
  id: string;
  name: string;
  host: User;
  hostId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Post {
  id: string;
  title: string;
  body: string;
  authorId: string;
  author: User;
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  text: string;
  userId: string;
  user: User;
  postId: string;
  post: Post;
  createdAt: string;
  updatedAt: string;
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

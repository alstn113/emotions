export interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePostParams {
  title: string;
  content: string;
}

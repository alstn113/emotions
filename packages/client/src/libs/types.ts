export interface User {
  id: string;
  email: string;
  username: string;
  displayName: string;
  createdAt: string;
  updatedAt: string;
}
export interface Room {
  id: string;
  name: string;
  owner: User;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateRoomParams {
  name: string;
}

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

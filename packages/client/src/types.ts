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
  owner: User;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateRoomParams {
  name: string;
}

export interface SocketMessagePayload {
  uid: string;
  username: string;
  message: string;
}

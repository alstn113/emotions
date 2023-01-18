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

export interface CreateRoomParams {
  name: string;
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

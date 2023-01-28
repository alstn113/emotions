const BASE_URL: string = import.meta.env.VITE_APP_BASE_URL || 'http://localhost:8080';
const AUTH = 'auth';
const USER = 'users';
const ROOM = 'rooms';
const POST = 'posts';
const COMMENT = 'comments';

export const API = {
  BASE_URL: `${BASE_URL}`,
  // auth
  GITHUB_AUTH: `${BASE_URL}/${AUTH}/github`,
  // rest
  AUTH: `${BASE_URL}/${AUTH}`,
  USER: `${BASE_URL}/${USER}`,
  ROOM: `${BASE_URL}/${ROOM}`,
  POST: `${BASE_URL}/${POST}`,
  COMMENT: `${BASE_URL}/${COMMENT}`,
  // socket
  ROOM_SOCKET: `${BASE_URL}/socket/room`,
} as const;

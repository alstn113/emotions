const BASE_URL: string = import.meta.env.VITE_APP_BASE_URL || 'http://localhost:8080';

export const API = {
  // rest
  BASE_URL: `${BASE_URL}`,
  POST: `${BASE_URL}/posts`,
  GITHUB_AUTH: `${BASE_URL}/auth/github`,
  // socket
  ROOM_SOCKET: `${BASE_URL}/socket/room`,
} as const;

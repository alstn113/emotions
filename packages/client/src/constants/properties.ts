const BASE_URL = import.meta.env.VITE_APP_BASE_URL || 'http://localhost:8080';
const POST = '/posts';

const ROOM_SOCKET = '/socket/room';

export const API = {
  // rest
  BASE_URL: `${BASE_URL}`,
  POST: `${BASE_URL}${POST}`,
  // socket
  ROOM_SOCKET: `${BASE_URL}${ROOM_SOCKET}`,
} as const;

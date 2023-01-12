const BASE_URL = import.meta.env.VITE_APP_BASE_URL || 'http://localhost:8080';
const POST = '/posts';

export const API = {
  BASE_URL: `${BASE_URL}`,
  POST: `${BASE_URL}${POST}`,
} as const;

// API URL
const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000/api';
const POST = 'posts';

export const PROPERTIES = {
  BASE_URL: `${BASE_URL}`,
  POST: `${POST}`,
} as const;

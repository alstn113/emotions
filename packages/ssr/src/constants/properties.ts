const BASE_URL: string =
  process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8080';
const AUTH = 'auth';
const USER = 'users';
const POST = 'posts';
const COMMENT = 'comments';

export const API = {
  BASE_URL: `${BASE_URL}`,
  // auth
  GITHUB_AUTH: `${BASE_URL}/${AUTH}/github`,
  // rest
  AUTH: `${BASE_URL}/${AUTH}`,
  USER: `${BASE_URL}/${USER}`,
  POST: `${BASE_URL}/${POST}`,
  COMMENT: `${BASE_URL}/${COMMENT}`,
} as const;

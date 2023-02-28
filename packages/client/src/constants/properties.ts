export const BASE_URL: string =
  import.meta.env.VITE_APP_BASE_URL || 'http://localhost:8080';

export const GITHUB_OAUTH_LOGIN_URL = `${BASE_URL}/auth/github`;

export const API = {
  AUTH: `/auth`,
  USER: `/users`,
  POST: `/posts`,
  SERIES: `/series`,
  COMMENT: `/comments`,
} as const;

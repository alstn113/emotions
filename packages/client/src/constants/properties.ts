import qs from 'qs';

export const BASE_URL: string =
  import.meta.env.VITE_APP_BASE_URL || 'http://localhost:8080';

export const GITHUB_OAUTH_LOGIN_URL = `${BASE_URL}/auth/github`;

export const API_URL = {
  AUTH: {
    LOGOUT: `/auth/logout`,
  },
  USER: {
    GET_ME: `/users/me`,
    GET_USER_BY_USERNAME: (username: string) => `/users/${username}`,
  },
  POST: {
    GET_POSTS: (cursor?: string) =>
      `/posts`.concat(qs.stringify({ cursor }, { addQueryPrefix: true })),
    GET_POSTS_BY_USERNAME: (username: string, cursor?: string) =>
      `/posts/username/${username}`.concat(
        qs.stringify({ cursor }, { addQueryPrefix: true }),
      ),
    GET_POST: (postId: string) => `/posts/${postId}`,
    GET_POST_BY_SLUG: (username: string, slug: string) =>
      `/posts/username/${username}/slug/${slug}`,
    GET_COMMENT_LIST: (postId: string) => `/posts/${postId}/comments`,
    GET_SEARCH_POSTS: (keyword: string) =>
      `/posts/search`.concat(
        qs.stringify({ keyword }, { addQueryPrefix: true }),
      ),
    CREATE_POST: `/posts`,
    DELETE_POST: (postId: string) => `/posts/${postId}`,
    LIKE_POST: (postId: string) => `/posts/${postId}/likes`,
    UNLIKE_POST: (postId: string) => `/posts/${postId}/likes`,
    UPLOAD_IMAGE: `/posts/image`,
  },
  COMMENT: {
    CREATE_COMMENT: `/comments`,
    DELETE_COMMENT: (commentId: string) => `/comments/${commentId}`,
    LIKE_COMMENT: (commentId: string) => `/comments/${commentId}/likes`,
    UNLIKE_COMMENT: (commentId: string) => `/comments/${commentId}/likes`,
  },
  SERIES: {
    GET_USER_SERIES: (username: string) => `/series/username/${username}`,
    GET_USER_SERIES_BY_NAME: (username: string, seriesName: string) =>
      `/series/${seriesName}/username/${username}`,
    CREATE_SERIES: `/series`,
    DELETE_SERIES: (seriesId: string) => `/series/${seriesId}`,
    APPEND_POST_TO_SERIES: (seriesId: string, postId: string) =>
      `/series/${seriesId}/postId/${postId}`,
    EDIT_SERIES: (seriesId: string) => `/series/${seriesId}`,
  },
} as const;

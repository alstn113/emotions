import { API_URL } from '~/constants';
import {
  CreatePostParams,
  PostList,
  SearchPostResponse,
  PostStats,
  PostWithStats,
  SinglePostReponse,
  CommentListResponse,
} from '~/lib/types';
import apiClient from './apiClient';

export const PostAPI = {
  getPosts: async (cursor?: string): Promise<PostList> => {
    const { data } = await apiClient.get(API_URL.POST.GET_POSTS(cursor));
    return data;
  },

  getPostsByUsername: async (
    username: string,
    cursor?: string,
  ): Promise<PostList> => {
    const { data } = await apiClient.get(
      API_URL.POST.GET_POSTS_BY_USERNAME(username, cursor),
    );
    return data;
  },

  getPost: async (postId: string): Promise<SinglePostReponse> => {
    const { data } = await apiClient.get(API_URL.POST.GET_POST(postId));
    return data;
  },

  getPostBySlug: async (
    username: string,
    slug: string,
  ): Promise<SinglePostReponse> => {
    const { data } = await apiClient.get(
      API_URL.POST.GET_POST_BY_SLUG(username, slug),
    );
    return data;
  },

  getCommentList: async (postId: string): Promise<CommentListResponse> => {
    const { data } = await apiClient.get(API_URL.POST.GET_COMMENT_LIST(postId));
    return data;
  },

  getSearchPosts: async (keyword: string): Promise<SearchPostResponse> => {
    const { data } = await apiClient.get(
      API_URL.POST.GET_SEARCH_POSTS(keyword),
    );
    return data;
  },

  createPost: async (params: CreatePostParams): Promise<PostWithStats> => {
    const { data } = await apiClient.post(API_URL.POST.CREATE_POST, params);
    return data;
  },

  deletePost: async (postId: string): Promise<void> => {
    const { data } = await apiClient.delete(API_URL.POST.DELETE_POST(postId));
    return data;
  },

  likePost: async (postId: string): Promise<PostStats> => {
    const { data } = await apiClient.post(API_URL.POST.LIKE_POST(postId));
    return data;
  },

  unlikePost: async (postId: string): Promise<PostStats> => {
    const { data } = await apiClient.delete(API_URL.POST.UNLIKE_POST(postId));
    return data;
  },

  uploadImage: async (image: File): Promise<string> => {
    const formData = new FormData();
    formData.append('image', image);

    const { data } = await apiClient.post(API_URL.POST.UPLOAD_IMAGE, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  },
};

import { API } from '~/constants';
import {
  Comment,
  CreatePostParams,
  PostList,
  PostStats,
  PostWithStats,
} from '~/lib/types';
import apiClient from './apiClient';
import qs from 'qs';

const PostAPI = {
  getPosts: async (cursor?: string): Promise<PostList> => {
    const { data } = await apiClient.get(
      `${API.POST}`.concat(qs.stringify({ cursor }, { addQueryPrefix: true })),
    );
    return data;
  },

  getPost: async (id: string): Promise<PostWithStats> => {
    const { data } = await apiClient.get(`${API.POST}/${id}`);
    return data;
  },

  getPostComments: async (id: string): Promise<Comment[]> => {
    const { data } = await apiClient.get(`${API.POST}/${id}/comments`);
    return data;
  },

  createPost: async (params: CreatePostParams): Promise<PostWithStats> => {
    const { data } = await apiClient.post(`${API.POST}`, params);
    return data;
  },

  deletePost: async (id: string): Promise<void> => {
    await apiClient.delete(`${API.POST}/${id}`);
  },

  likePost: async (id: string): Promise<PostStats> => {
    const { data } = await apiClient.post(`${API.POST}/${id}/likes`);
    return data;
  },

  unlikePost: async (id: string): Promise<PostStats> => {
    const { data } = await apiClient.delete(`${API.POST}/${id}/likes`);
    return data;
  },

  uploadImage: async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);

    const { data } = await apiClient.post(`${API.POST}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  },
};

export default PostAPI;

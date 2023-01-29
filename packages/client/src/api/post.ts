import { API } from '~/constants';
import { Comment, CreatePostParams, Post, PostStats, PostWithStats } from '~/types';
import apiClient from './apiClient';

const PostAPI = {
  getPosts: async (): Promise<Post[]> => {
    const { data } = await apiClient.get(`${API.POST}`);
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
};

export default PostAPI;

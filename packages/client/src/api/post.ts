import { API } from '~/constants';
import { CreatePostParams, Post } from '~/types';
import apiClient from './apiClient';

const PostAPI = {
  getPosts: async (): Promise<Post[]> => {
    const { data } = await apiClient.get(`${API.POST}`);
    return data;
  },

  getPost: async (id: string): Promise<Post> => {
    const { data } = await apiClient.get(`${API.POST}/${id}`);
    return data;
  },

  createPost: async (params: CreatePostParams): Promise<Post> => {
    const { data } = await apiClient.post(`${API.POST}`, params);
    return data;
  },

  deletePost: async (id: string): Promise<Post> => {
    const { data } = await apiClient.delete(`${API.POST}/${id}`);
    return data;
  },
};

export default PostAPI;

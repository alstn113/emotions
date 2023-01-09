import { PROPERTIES } from '~/constants/properties';
import { CreatePostParams } from '../types';
import apiClient from './apiClient';

const PostAPI = {
  getPosts: async () => {
    const { data } = await apiClient.get(`/${PROPERTIES.POST}`);
    return data;
  },

  getPost: async (id: string) => {
    const { data } = await apiClient.get(`/${PROPERTIES.POST}/${id}`);
    return data;
  },

  createPost: async (params: CreatePostParams) => {
    const { data } = await apiClient.post(`/${PROPERTIES.POST}`, params);
    return data;
  },

  deletePost: async (id: string) => {
    const { data } = await apiClient.delete(`/${PROPERTIES.POST}/${id}`);
    return data;
  },
};

export default PostAPI;

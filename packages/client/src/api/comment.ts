import { API } from '~/constants';
import { CreateCommentParams, Comment } from '~/types';
import apiClient from './apiClient';

const CommentAPI = {
  getComments: async (): Promise<Comment[]> => {
    const { data } = await apiClient.get(`${API.COMMENT}`);
    return data;
  },

  getComment: async (id: string): Promise<Comment> => {
    const { data } = await apiClient.get(`${API.COMMENT}/${id}`);
    return data;
  },

  createComment: async (params: CreateCommentParams): Promise<Comment> => {
    const { data } = await apiClient.post(`${API.COMMENT}`, params);
    return data;
  },

  deleteComment: async (id: string): Promise<Comment> => {
    const { data } = await apiClient.delete(`${API.COMMENT}/${id}`);
    return data;
  },
};

export default CommentAPI;

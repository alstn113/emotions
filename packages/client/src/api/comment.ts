import { API } from '~/constants';
import { CreateCommentParams, Comment } from '~/types';
import apiClient from './apiClient';

const CommentAPI = {
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

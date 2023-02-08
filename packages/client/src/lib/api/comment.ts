import { API } from '~/constants';
import { CreateCommentParams, Comment } from '~/lib/types';
import apiClient from './apiClient';

const CommentAPI = {
  createComment: async (params: CreateCommentParams): Promise<Comment> => {
    const { data } = await apiClient.post(`${API.COMMENT}`, params);
    return data;
  },

  deleteComment: async (id: string): Promise<void> => {
    await apiClient.delete(`${API.COMMENT}/${id}`);
  },

  likeComment: async (id: string): Promise<number> => {
    const { data } = await apiClient.post(`${API.COMMENT}/${id}/likes`);
    return data;
  },

  unlikeComment: async (id: string): Promise<number> => {
    const { data } = await apiClient.delete(`${API.COMMENT}/${id}/likes`);
    return data;
  },
};

export default CommentAPI;

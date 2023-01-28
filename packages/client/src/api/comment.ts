import { API } from '~/constants';
import { CreateCommentParams, Comment } from '~/types';
import apiClient from './apiClient';

const CommentAPI = {
  getComments: async (postId: string): Promise<Comment[]> => {
    const { data } = await apiClient.get(`${API.COMMENT}/${postId}`);
    return data;
  },

  createComment: async ({ postId, text }: CreateCommentParams): Promise<Comment> => {
    const { data } = await apiClient.post(`${API.COMMENT}/${postId}`, {
      text,
    });
    return data;
  },

  deleteComment: async (id: string): Promise<Comment> => {
    const { data } = await apiClient.delete(`${API.COMMENT}/${id}`);
    return data;
  },
};

export default CommentAPI;

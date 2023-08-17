import { CreateCommentParams, Comment } from '~/lib/types';

import { API_URL } from '~/constants';

import apiClient from './apiClient';

export const CommentAPI = {
  createComment: async (params: CreateCommentParams): Promise<Comment> => {
    const { data } = await apiClient.post(
      API_URL.COMMENT.CREATE_COMMENT,
      params,
    );
    return data;
  },

  deleteComment: async (commentId: string): Promise<void> => {
    const { data } = await apiClient.delete(
      API_URL.COMMENT.DELETE_COMMENT(commentId),
    );
    return data;
  },

  likeComment: async (commentId: string): Promise<number> => {
    const { data } = await apiClient.post(
      API_URL.COMMENT.LIKE_COMMENT(commentId),
    );
    return data;
  },

  unlikeComment: async (commentId: string): Promise<number> => {
    const { data } = await apiClient.delete(
      API_URL.COMMENT.UNLIKE_COMMENT(commentId),
    );
    return data;
  },
};

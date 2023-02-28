import { API_URL } from '~/constants';
import { User } from '~/lib/types';
import apiClient from './apiClient';

export const UserAPI = {
  getMe: async (): Promise<User | null> => {
    const { data } = await apiClient.get(API_URL.USER.GET_ME);
    return data;
  },

  getUserByUsername: async (username: string): Promise<User> => {
    const { data } = await apiClient.get(
      API_URL.USER.GET_USER_BY_USERNAME(username),
    );
    return data;
  },
};

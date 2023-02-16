import { API } from '~/constants';
import { User } from '~/lib/types';
import apiClient from './apiClient';

const UserAPI = {
  getMe: async (): Promise<User | null> => {
    const { data } = await apiClient.get(`${API.USER}/me`);
    return data;
  },

  getUserByUsername: async (username: string): Promise<User> => {
    const { data } = await apiClient.get(`${API.USER}/${username}`);
    return data;
  },
};

export default UserAPI;

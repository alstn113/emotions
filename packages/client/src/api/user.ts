import { API } from '~/constants';
import { User } from '~/types';
import apiClient from './apiClient';

const UserAPI = {
  getMe: async (): Promise<User | null> => {
    const { data } = await apiClient.get(`${API.USER}/me`);
    return data;
  },
};

export default UserAPI;

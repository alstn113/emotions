import { API_URL } from '~/constants';

import apiClient from './apiClient';

export const AuthAPI = {
  logout: async (): Promise<void> => {
    const { data } = await apiClient.delete(API_URL.AUTH.LOGOUT);
    return data;
  },
};

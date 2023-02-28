import { API } from '~/constants';
import apiClient from './apiClient';

export const AuthAPI = {
  logout: async () => {
    const { data } = await apiClient.delete(`${API.AUTH}/logout`);
    return data;
  },
};

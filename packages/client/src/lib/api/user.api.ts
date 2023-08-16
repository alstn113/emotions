import {
  UpdateEmailParams,
  UpdateEmailNotificationParams,
  User,
} from '~/lib/types';

import { API_URL } from '~/constants';

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

  updateEmail: async (params: UpdateEmailParams): Promise<string | null> => {
    const { data } = await apiClient.patch(API_URL.USER.UPDATE_EMAIL, params);
    return data;
  },

  updateEmailNotification: async (
    params: UpdateEmailNotificationParams,
  ): Promise<boolean> => {
    const { data } = await apiClient.patch(
      API_URL.USER.UPDATE_EMAIL_NOTIFICATION,
      params,
    );
    return data;
  },
};

import axios from 'axios';

const apiClient = axios.create({
  withCredentials: true,
});

export default apiClient;

export const setClientCookie = (cookie: string) => {
  apiClient.defaults.headers.common['Cookie'] = cookie;
};

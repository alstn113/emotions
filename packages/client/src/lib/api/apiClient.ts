import axios from 'axios';
import { BASE_URL } from '~/constants';

const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export default apiClient;

import axios from 'axios';

const apiClient = axios.create({
  withCredentials: true,
});

export default apiClient;

import axios from 'axios';

const apiClient = axios.create({
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
  },
});

export default apiClient;

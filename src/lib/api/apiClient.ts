import axios from 'axios';
import { PROPERTIES } from '~/constants/properties';

const apiClient = axios.create({
  baseURL: PROPERTIES.BASE_URL,
});

export default apiClient;

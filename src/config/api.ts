import axios from 'axios';
import {BaseUrl} from '../constants/urls.ts';

const api = axios.create({
  baseURL: BaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async (config: any) => {
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  },
);

export default api;

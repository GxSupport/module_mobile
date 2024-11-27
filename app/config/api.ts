import axios from 'axios';
import {BaseUrl} from '../constants/urls.ts';
import {getStorage} from '../helpers/Storage.ts';

const api = axios.create({
  baseURL: BaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async config => {
    const token = await getStorage('access_token');
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export default api;

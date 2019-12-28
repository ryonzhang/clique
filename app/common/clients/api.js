import axios from 'axios';
import {AsyncStorage} from 'react-native';

const axiosService = axios.create({
  baseURL: 'http://127.0.0.1:3000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosService.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('@token');
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export default axiosService;

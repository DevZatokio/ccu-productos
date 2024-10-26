import axios, {AxiosRequestHeaders} from 'axios';
import http from '../configs/axios';
import Storage from '../utils/Storage';
const Axios = axios.create({
  headers: http.headers,
  timeout: http.timeout,
});

Axios.defaults.baseURL = http.baseURL;

Axios.interceptors.request.use( async config => {
  const token = await Storage.getToken('token');
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    } as AxiosRequestHeaders;
  }
  return config;
});

Axios.interceptors.response.use(
  response => response,
  error => {
    if (error && error.response && error.response.status === 401) {
      // StoragesUtils.remove("token");
    }
    return Promise.reject(error);
  },
);

export default Axios;

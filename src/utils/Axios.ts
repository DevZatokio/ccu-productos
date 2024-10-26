import axios, { AxiosRequestHeaders } from "axios";
import http from "../configs/axios";
const Axios = axios.create({
  headers: http.headers,
  timeout: http.timeout,
});

Axios.defaults.baseURL = http.baseURL;


Axios.interceptors.request.use((config) => {
  // const token = StoragesUtils.get("token");
  // if (token) {
  //   console.log("token", token);
  //   config.headers = {
  //     ...config.headers,
  //     Authorization: `Bearer ${token}`,
  //   } as AxiosRequestHeaders;;
  // }
  return config;
});

Axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error && error.response && error.response.status === 401) {
      // StoragesUtils.remove("token");
    }
    return Promise.reject(error);
  }
);

export default Axios;
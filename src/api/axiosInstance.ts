import axios, { AxiosError, AxiosResponse } from 'axios';

const httpRequest = axios.create({
  baseURL: process.env.API_DOMAIN,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
  },
  withCredentials: true,
});

export interface ResponseError extends AxiosError {}

const getUserToken = () => {
  if (typeof window === 'undefined') return {};
  return window.localStorage.getItem('user_token');
};

const axiosInstance = () => {
  const userToken = getUserToken();
  httpRequest.defaults.headers.common.authorization = userToken ? `Bearer ${userToken}` : null;

  httpRequest.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error: ResponseError) => {
      if (error.response?.status === 401 || error.response?.status === 403) {
        window.location.href = '/login';
      }
      console.log(error);
      return Promise.reject(error);
    }
  );

  return {
    httpRequest,
  };
};

export default axiosInstance;

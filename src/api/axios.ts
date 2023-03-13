import Axios, { AxiosError, AxiosResponse } from 'axios';

const getToken = () => {
  if (typeof window === 'undefined') return {};
  return window.localStorage.getItem('user_token');
};

const userToken = getToken();

export const axios = Axios.create({
  baseURL: process.env.API_DOMAIN || 'https://schdule-express.vercel.app',
  headers: {
    'content-type': 'application/json',
    Authorization: userToken !== undefined || userToken ? `Bearer ${userToken}` : null,
  },
});

export interface ResponseError extends AxiosError {}

axios.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: ResponseError) => {
    return Promise.reject(error);
  }
);

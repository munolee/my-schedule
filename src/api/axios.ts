import Axios, { AxiosError, AxiosResponse } from 'axios';

export const axios = Axios.create({
  // baseURL: process.env.API_DOMAIN || 'https://schdule-express.vercel.app',
  baseURL: process.env.API_DOMAIN || 'http://localhost:8080',
  headers: {
    'content-type': 'application/json',
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

import { axios } from './axios';

export interface LoginParamsType {
  id: string;
  pw: string;
}

export interface LoginResponseType {
  success: boolean;
  token: string;
}

export const AuthApi = {
  getAuthLoginCheck: async (params: string) => {
    const response = await axios.get(`/api/auth/`);
    return response.data;
  },

  userLogin: async (params: LoginParamsType) => {
    const response = await axios.post<LoginResponseType>(`api/auth/login`, params);
    return response.data;
  },

  userLogout: async () => {
    const response = await axios.post(`api/auth/logout`);
    return response.data;
  },
};

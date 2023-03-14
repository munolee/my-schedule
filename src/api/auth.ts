import { axiosInstance } from '@api/axios';

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
    const response = await axiosInstance.get(`/api/auth/`);
    return response.data;
  },

  userLogin: async (params: LoginParamsType) => {
    const response = await axiosInstance.post<LoginResponseType>(`api/auth/login`, params);
    return response.data;
  },

  userLogout: async () => {
    const response = await axiosInstance.post(`api/auth/logout`);
    return response.data;
  },
};

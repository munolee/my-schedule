import AxiosInstance from '@api/axiosInstance';

export interface LoginParamsType {
  id: string;
  pw: string;
}

export interface LoginResponseType {
  success: boolean;
  message: string;
  token: string;
}

const { httpRequest } = AxiosInstance();

export const AuthApi = {
  getLoginCheck: async () => {
    const response = await httpRequest.get(`/api/auth/login`);
    return response.data;
  },

  userLogin: async (params: LoginParamsType) => {
    const response = await httpRequest.post<LoginResponseType>(`api/auth/login`, params);
    return response.data;
  },

  userLogout: async () => {
    const response = await httpRequest.post(`api/auth/logout`);
    return response.data;
  },
};

import { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { AuthApi, LoginParamsType } from '@api/auth';

const useAuthLogin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const userLogin = () => {
    return useMutation(
      async (params: LoginParamsType) => {
        const result = await AuthApi.userLogin(params);
        return result;
      },
      {
        onSuccess: (response) => {
          if (!response.success) {
            return;
          }
          saveToken(response?.token);
          location.href = '/';
        },
      }
    );
  };

  const userLogout = () => {
    return useMutation(
      async () => {
        const result = await AuthApi.userLogout();
        return result;
      },
      {
        onSuccess: (response) => {
          if (!response.success) {
            return;
          }
          removeToken();
          queryClient.clear();
          location.href = '/login';
        },
      }
    );
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = window.localStorage.getItem('user_token');
      setIsLoggedIn(!!token);
    }
  }, []);

  const saveToken = (token: string) => {
    window.localStorage.setItem('user_token', token);
  };

  const removeToken = () => {
    window.localStorage.removeItem('user_token');
  };

  return {
    userLogin,
    userLogout,
    isLoggedIn,
  };
};

export default useAuthLogin;

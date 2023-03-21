import { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { useMutation, useQueryClient } from 'react-query';
import { AuthApi, LoginParamsType } from '@api/auth';

const useAuthLogin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const { t } = useTranslation();
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
          saveUserId(response?.userId);
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

  const getUserInfo = () => {
    const userInfo = window.localStorage.getItem('user_id');
    if (userInfo === process.env.GUEST_ID) {
      return t('common:guestUser');
    }
    return userInfo;
  };

  const saveToken = (token: string) => {
    window.localStorage.setItem('user_token', token);
  };

  const saveUserId = (info: string) => {
    window.localStorage.setItem('user_id', info);
  };

  const removeToken = () => {
    window.localStorage.removeItem('user_token');
  };

  return {
    userLogin,
    userLogout,
    isLoggedIn,
    getUserInfo,
  };
};

export default useAuthLogin;

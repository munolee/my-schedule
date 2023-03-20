import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';
import { AuthApi, LoginParamsType } from '@api/auth';

const useAuthLogin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const { push } = useRouter();

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
          window.location.href = '/';
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
          window.localStorage.removeItem('user_token');
          queryClient.clear();
          push('/login');
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

  // const hasSignedIn = () => {
  //   if (typeof window === 'undefined') {
  //     return false;
  //   }
  // };

  const saveToken = (token: string) => {
    window.localStorage.setItem('user_token', token);
  };

  return {
    userLogin,
    userLogout,
    isLoggedIn,
  };
};

export default useAuthLogin;

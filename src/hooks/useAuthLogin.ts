import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';
import { AuthApi, LoginParamsType } from '@api/auth';

const useAuthLogin = () => {
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
          push('/');
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

  const saveToken = (token: string) => {
    window.localStorage.setItem('user_token', token);
  };

  return {
    userLogin,
    userLogout,
  };
};

export default useAuthLogin;

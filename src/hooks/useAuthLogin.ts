import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { AuthApi, LoginParamsType } from '@api/auth';

const useAuthLogin = () => {
  const { push } = useRouter();

  const saveToken = (token: string) => {
    window.localStorage.setItem('user_token', token);
  };

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

  const hasSignedIn = () => {
    const token = window.localStorage.getItem('user_token');
    return !!token;
  };

  return {
    userLogin,
    hasSignedIn,
  };
};

export default useAuthLogin;

import { useMutation } from 'react-query';
import { AuthApi, LoginParamsType } from '@api/auth';

const useAuthLogin = () => {
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
          if (!response) {
            return;
          }
          saveToken(response?.token);
        },
      }
    );
  };

  return {
    userLogin,
  };
};

export default useAuthLogin;

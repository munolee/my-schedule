import { useEffect } from 'react';
import { Global, ThemeProvider } from '@emotion/react';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { appWithTranslation } from 'next-i18next';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { RecoilRoot } from 'recoil';
import { axiosInstance } from '@api/axios';
import Layout from '@components/layout';
import useTheme from '@hooks/useTheme';
import { GlobalStyle } from '@styles/globalStyle';
import { ResetStyle } from '@styles/resetStyle';
import { default as Theme } from '@styles/theme';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      notifyOnChangeProps: 'tracked',
      refetchOnWindowFocus: false,
    },
  },
});

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();

  useEffect(() => {
    const interceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          router.push('/login');
        }
        return Promise.reject(error);
      }
    );
    return () => {
      axiosInstance.interceptors.response.eject(interceptor);
    };
  }, [router]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={Theme[theme]}>
        <RecoilRoot>
          <Global styles={ResetStyle} />
          <Global styles={GlobalStyle} />
          <Layout>
            <Component {...pageProps} toggleTheme={toggleTheme} />
          </Layout>
          <ReactQueryDevtools initialIsOpen={false} />
        </RecoilRoot>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default appWithTranslation(MyApp);

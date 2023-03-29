import { Global, ThemeProvider } from '@emotion/react';
import { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { RecoilRoot } from 'recoil';
import ToastBase from '@components/common/ToastBase';
import Layout from '@components/layout';
import useAppTheme from '@hooks/useAppTheme';
import { GlobalStyle } from '@styles/globalStyle';
import { ResetStyle } from '@styles/resetStyle';
import { default as Theme } from '@styles/theme';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      notifyOnChangeProps: 'tracked',
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 1000 * 60,
    },
  },
});

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { theme, toggleTheme } = useAppTheme();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={Theme[theme]}>
        <RecoilRoot>
          <Global styles={ResetStyle} />
          <Global styles={GlobalStyle} />
          <Layout>
            <Component {...pageProps} toggleTheme={toggleTheme} />
            <ToastBase />
          </Layout>
          <ReactQueryDevtools initialIsOpen={false} />
        </RecoilRoot>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default appWithTranslation(MyApp);

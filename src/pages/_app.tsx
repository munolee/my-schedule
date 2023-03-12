import { Global, ThemeProvider } from '@emotion/react';
import { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { RecoilRoot } from 'recoil';
import Header from '@components/common/Header';
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

const App = ({ Component, pageProps }: AppProps) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={Theme[theme]}>
        <RecoilRoot>
          <Global styles={ResetStyle} />
          <Global styles={GlobalStyle} />
          <Layout>
            <Header />
            <Component {...pageProps} toggleTheme={toggleTheme} />
          </Layout>
          <ReactQueryDevtools initialIsOpen={false} />
        </RecoilRoot>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;

import { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { RecoilRoot } from 'recoil';
import { Global, ThemeProvider } from '@emotion/react';
import { ResetStyle } from '@styles/resetStyle';
import { GlobalStyle } from '@styles/globalStyle';
import { default as Theme } from '@styles/theme';
import Layout from '@components/layout';
import Header from '@components/common/Header';
import useTheme from '@hooks/useTheme';

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
          <ReactQueryDevtools initialIsOpen={true} />
        </RecoilRoot>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;

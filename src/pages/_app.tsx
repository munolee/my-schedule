import { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { RecoilRoot } from 'recoil';
import { Global } from '@emotion/react';
import { ResetStyle } from '@styles/resetStyle';
import { GlobalStyle } from '@styles/globalStyle';
import Layout from '@components/layout';
import Header from '@components/common/Header';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      notifyOnChangeProps: 'tracked',
      refetchOnWindowFocus: false,
    },
  },
});

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Global styles={ResetStyle} />
        <Global styles={GlobalStyle} />
        <Layout>
          <Header />
          <Component {...pageProps} />
        </Layout>
        <ReactQueryDevtools initialIsOpen={true} />
      </RecoilRoot>
    </QueryClientProvider>
  );
};

export default App;

import { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { Global } from '@emotion/react';
import { ResetStyle } from '@styles/resetStyle';
import { GlobalStyle } from '@styles/globalStyle';
import Layout from '@components/layout';
import Header from '@components/common/Header';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <RecoilRoot>
      <Global styles={ResetStyle} />
      <Global styles={GlobalStyle} />
      <Layout>
        <Header />
        <Component {...pageProps} />
      </Layout>
    </RecoilRoot>
  );
};

export default App;

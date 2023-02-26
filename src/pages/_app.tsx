import { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { Global } from '@emotion/react';
import Header from '@components/common/Header';
import { ResetStyle } from '@styles/resetStyle';
import { GlobalStyle } from '@styles/globalStyle';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <RecoilRoot>
      <Global styles={ResetStyle} />
      <Global styles={GlobalStyle} />
      <Header />
      <Component {...pageProps} />;
    </RecoilRoot>
  );
};

export default App;

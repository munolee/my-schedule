import { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { css, Global } from '@emotion/react';
import Header from '@components/common/Header';

const App = ({ Component, pageProps }: AppProps) => {
  const GlobalStyle = css`
    @font-face {
      font-family: 'SCDream7';
      src: url('/fonts/SCDream7.otf');
      font-weight: normal;
      font-style: normal;
    }

    * {
      -moz-osx-font-smoothing: grayscale;
      -webkit-font-smoothing: antialiased;
      box-sizing: border-box;
    }

    body {
      /*font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";*/
      margin: 0 auto;
      padding: 0;
      font-family: 'SCDream7', sans-serif;
      background: #f9f8f7;
      user-select: none;
      -webkit-user-select: none;
      -ms-user-select: none;
    }
  `;

  return (
    <RecoilRoot>
      <Global styles={GlobalStyle} />
      <Header />
      <Component {...pageProps} />;
    </RecoilRoot>
  );
};

export default App;

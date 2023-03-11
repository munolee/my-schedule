import { css } from '@emotion/react';
export const GlobalStyle = css`
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
    font-size: calc(min(100vw, 450px) / 375 * 10);
  }

  body {
    font-family: 'SCDream7', sans-serif, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
      'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
    margin: 0 auto;
    padding: 0;
    background-color: #f9f8f7;
    user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
  }
`;

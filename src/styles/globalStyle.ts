import { css } from '@emotion/react';

export const GlobalStyle = css`
  * {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
    font-size: calc(min(100vw, 450px) / 375 * 10);
    transition: background-color 0.2s;
  }

  body {
    margin: 0 auto;
    padding: 0;
    user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
  }
`;

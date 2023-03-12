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
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
      'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
    margin: 0 auto;
    padding: 0;
    user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
  }

  @font-face {
    font-family: 'Pretendard';
    src: local('Pretendard Bold'),
      url('https://fitpet-mall-v3.s3.ap-northeast-2.amazonaws.com/prod/assets/fonts/Pretendard-Bold.subset.woff2')
        format('woff2'),
      url('https://fitpet-mall-v3.s3.ap-northeast-2.amazonaws.com/prod/assets/fonts/Pretendard-Bold.woff')
        format('woff'),
      url('https://fitpet-mall-v3.s3.ap-northeast-2.amazonaws.com/prod/assets/fonts/Pretendard-Bold.ttf')
        format('truetype');
    font-display: block;
    font-weight: 700;
  }
  @font-face {
    font-family: 'Pretendard';
    src: local('Pretendard Medium'),
      url('https://fitpet-mall-v3.s3.ap-northeast-2.amazonaws.com/prod/assets/fonts/Pretendard-Medium.subset.woff2')
        format('woff2'),
      url('https://fitpet-mall-v3.s3.ap-northeast-2.amazonaws.com/prod/assets/fonts/Pretendard-Medium.woff')
        format('woff'),
      url('https://fitpet-mall-v3.s3.ap-northeast-2.amazonaws.com/prod/assets/fonts/Pretendard-Medium.ttf')
        format('truetype');
    font-display: block;
    font-weight: 500;
  }
  @font-face {
    font-family: 'Pretendard';
    src: local('Pretendard Regular'),
      url('https://fitpet-mall-v3.s3.ap-northeast-2.amazonaws.com/prod/assets/fonts/Pretendard-Regular.subset.woff2')
        format('woff2'),
      url('https://fitpet-mall-v3.s3.ap-northeast-2.amazonaws.com/prod/assets/fonts/Pretendard-Regular.woff')
        format('woff'),
      url('https://fitpet-mall-v3.s3.ap-northeast-2.amazonaws.com/prod/assets/fonts/Pretendard-Regular.ttf')
        format('truetype');
    font-display: block;
    font-weight: 400;
  }
  @font-face {
    font-family: 'Pretendard';
    src: local('Pretendard Light'),
      url('https://fitpet-mall-v3.s3.ap-northeast-2.amazonaws.com/prod/assets/fonts/Pretendard-Light.subset.woff2')
        format('woff2'),
      url('https://fitpet-mall-v3.s3.ap-northeast-2.amazonaws.com/prod/assets/fonts/Pretendard-Light.woff')
        format('woff'),
      url('https://fitpet-mall-v3.s3.ap-northeast-2.amazonaws.com/prod/assets/fonts/Pretendard-Light.ttf')
        format('truetype');
    font-display: block;
    font-weight: 300;
  }
  @font-face {
    font-family: 'Pretendard';
    src: local('Pretendard Thin'),
      url('https://fitpet-mall-v3.s3.ap-northeast-2.amazonaws.com/prod/assets/fonts/Pretendard-Thin.subset.woff2')
        format('woff2'),
      url('https://fitpet-mall-v3.s3.ap-northeast-2.amazonaws.com/prod/assets/fonts/Pretendard-Thin.woff')
        format('woff'),
      url('https://fitpet-mall-v3.s3.ap-northeast-2.amazonaws.com/prod/assets/fonts/Pretendard-Thin.ttf')
        format('truetype');
    font-display: block;
    font-weight: 100;
  }
`;

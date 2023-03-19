import { Html, Head, Main, NextScript } from 'next/document';

const Document = () => {
  return (
    <Html lang="ko">
      <Head />
      <title>My Schedule</title>
      <body>
        <Main />
        <div id="modal-root" />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;

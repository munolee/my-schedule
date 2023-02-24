import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { Global, css } from '@emotion/react';
import Home from '@pages/Home';
import Header from '@components/common/Header';

const GlobalStyle = css`
  @font-face {
    font-family: 'SCDream7';
    src: url('/fonts/SCDream7.otf');
    font-weight: normal;
    font-style: normal;
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

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Global styles={GlobalStyle} />
        <Header />
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;

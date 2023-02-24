import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '@pages/Home';
import Header from '@components/common/Header';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
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
    font-family: 'SCDream7',sans-serif;
    background: #f9f8f7;
    user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
  }
`;

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Header />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

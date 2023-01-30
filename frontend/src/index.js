import React from 'react';
import ReactDOM from 'react-dom/client';
import GlobalStyle from './styles/GlobalStyle';
import Theme from './styles/Theme';
import { ThemeProvider } from 'styled-components';
import reportWebVitals from './reportWebVitals';

import Routes from './Routes';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <GlobalStyle />
    <ThemeProvider theme={Theme}>
      <Routes />
    </ThemeProvider>
  </>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

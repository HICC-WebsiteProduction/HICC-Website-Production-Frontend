import React from 'react';
import ReactDOM from 'react-dom/client';
import GlobalStyle from './styles/GlobalStyle';
import Theme from './styles/Theme';
import { ThemeProvider } from 'styled-components';
import reportWebVitals from './reportWebVitals';

import Routes from './Routes';
import { applyMiddleware, createStore } from 'redux';
import promiseMiddleware from 'redux-promise';
import reduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import rootReducer from './_reducers/RootReducer';
import { worker } from './mocks/browsers';
import { RecoilRoot } from 'recoil';

const createStoreWidthMiddleware = applyMiddleware(
  promiseMiddleware,
  reduxThunk,
)(createStore);

if (process.env.NODE_ENV === 'development') {
  worker.start();
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <GlobalStyle />
    <ThemeProvider theme={Theme}>
      <RecoilRoot>
        <Provider
          store={createStoreWidthMiddleware(
            rootReducer,
            window.__REDUX_DEVTOOLS_EXTENSION__ &&
              window.__REDUX_DEVTOOLS_EXTENSION__(),
          )}
        >
          <Routes />
        </Provider>
      </RecoilRoot>
    </ThemeProvider>
  </>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

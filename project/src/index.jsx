import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import {Router as BrowserRouter} from 'react-router-dom';
import rootReducer from './store/root-reducer';
import { createAPI } from './services/api';
import { requireAuthorization} from './store/action';
import { AuthorizationStatus } from './constants';
import { redirect } from './store/middlewares/redirect';
import browserHistory from './browser-history';

const api = createAPI(
  () => store.dispatch(requireAuthorization(AuthorizationStatus.NO_AUTH)),
);

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(redirect),
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter history={browserHistory}>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));

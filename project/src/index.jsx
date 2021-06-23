import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { Cards } from './mocks/offers';
import { Reviews } from './mocks/offers';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import { reducer } from './store/reducer';

const store = createStore(
  reducer,
  composeWithDevTools(),
);

ReactDOM.render(
  <Provider store={store}>
    <App cards={Cards} reviews={Reviews}/>
  </Provider>,
  document.getElementById('root'));

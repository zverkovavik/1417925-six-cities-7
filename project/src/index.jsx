import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { Cards } from './mocks/offers';
import { Reviews } from './mocks/offers';

ReactDOM.render(
  <App cards={Cards} reviews={Reviews}/>,
  document.getElementById('root'));

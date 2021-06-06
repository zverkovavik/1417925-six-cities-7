import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { Cards } from './mocks/cards';

ReactDOM.render(
  <App cards={Cards}/>,
  document.getElementById('root'));

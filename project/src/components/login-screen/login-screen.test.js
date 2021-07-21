import React from 'react';
import { render, screen } from '@testing-library/react';
import {Router} from 'react-router-dom';
import { createMemoryHistory } from 'history';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import LoginScreen from './login-screen';

const mockStore = configureStore({});
let history = null;
let store = null;

describe('Component: LoginScreen', () => {
  beforeAll(() => {
    history = createMemoryHistory();
    store = mockStore({});
  });

  it('should render "LoginScreen" when user navigate to "login" url', () => {
    history.push('/login');

    render(
      <Provider store={store}>
        <Router history={history}>
          <LoginScreen />
        </Router>
      </Provider>,
    );

    userEvent.type(screen.getByTestId('login'), 'keks');
    userEvent.type(screen.getByTestId('password'), '123456');

    expect(screen.getByDisplayValue(/keks/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/123456/i)).toBeInTheDocument();
  });
});

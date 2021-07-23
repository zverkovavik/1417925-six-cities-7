import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { AuthorizationStatus } from '../../constants';
import NavListLogin from './nav-list-login';
import userEvent from '@testing-library/user-event';

let history = null;
let store = null;
const mockStore = configureStore({});


describe('Component: NavListLogin', () => {
  beforeAll(() => {
    history = createMemoryHistory();
  });

  it('should render correctly for not logged in user', () => {
    store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        login: '',
        avatarUrl: '',
      },
    });
    render(
      <Provider store={store}>
        <Router history={history}>
          <NavListLogin />
        </Router>
      </Provider>);

    expect(screen.getByTestId(/header-not-logged/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
    userEvent.click(screen.getByRole('link'));
  });
});

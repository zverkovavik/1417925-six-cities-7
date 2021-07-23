import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { AuthorizationStatus } from '../../constants';
import NavListForAuth from './nav-list-for-auth';

let history = null;
let store = null;
const mockStore = configureStore({});


describe('Component: NavListForAuth', () => {
  beforeAll(() => {
    history = createMemoryHistory();
  });

  it('should render correctly for logged in user', () => {
    store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.AUTH,
        login: 'test@test.com',
        avatarUrl: 'test avatar',
      },
    });
    render(
      <Provider store={store}>
        <Router history={history}>
          <NavListForAuth />
        </Router>
      </Provider>);

    expect(screen.getByTestId(/user-email/i)).toBeInTheDocument();
    expect(screen.getByTestId(/user-email/i)).toHaveTextContent('test@test.com');
    expect(screen.getByTestId(/sign-out/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
  });
});

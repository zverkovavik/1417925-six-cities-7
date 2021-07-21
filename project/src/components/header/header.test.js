import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { AuthorizationStatus } from '../../constants';
import Header from './header';


let history = null;
let store = null;
const mockStore = configureStore({});


describe('Component: Header', () => {
  beforeAll(() => {
    history = createMemoryHistory();
    store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.AUTH,
        login: 'test@test.com',
        avatarUrl: 'test avatar',
      },
    });
  });

  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <Router history={history}>
          <Header />
        </Router>
      </Provider>);

    expect(screen.getByTestId(/header/i)).toBeInTheDocument();
  });

});

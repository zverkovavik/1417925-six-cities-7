import React from 'react';
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { AuthorizationStatus } from '../../constants';
import PrivateRouteToLogin from './private-route-to-login';

const mockStore = configureStore({});
let history = null;

describe('Component: PrivateRouter', () => {
  beforeEach(() => {
    history = createMemoryHistory();
    history.push('/login');
  });

  it('should render login component when user not authorized', () => {
    const store = mockStore({
      USER: { authorizationStatus: AuthorizationStatus.NO_AUTH },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <Route exact path="/"><h1>Login</h1></Route>
          <PrivateRouteToLogin
            exact
            path="/login"
            render={() => (<h1>Redirect to main page</h1>)}
          />
        </Router>
      </Provider>,
    );
    expect(screen.getByText(/Redirect to main page/i)).toBeInTheDocument();
    expect(screen.queryByText(/Login/i)).not.toBeInTheDocument();
  });

  it('should render main page component, when user authorized', () => {
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.AUTH},
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <Route exact path="/"><h1>Login</h1></Route>
          <PrivateRouteToLogin
            exact
            path="/login"
            render={() => (<h1>Redirect to main page</h1>)}
          />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Login/i)).toBeInTheDocument();
    expect(screen.queryByText(/Redirect to main page/i)).not.toBeInTheDocument();
  });
});

import React from 'react';
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { AuthorizationStatus } from '../../constants';
import PrivateRouteToFavorite from './private-route-to-favorite';

const mockStore = configureStore({});
let history = null;

describe('Component: PrivateRouter', () => {
  beforeEach(() => {
    history = createMemoryHistory();
    history.push('/favorites');
  });

  it('should render Login component for public route, when user not authorized', () => {
    const store = mockStore({
      USER: { authorizationStatus: AuthorizationStatus.NO_AUTH },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <Route exact path="/login"><h1>Public Route</h1></Route>
          <PrivateRouteToFavorite
            exact
            path="/favorites"
            render={() => (<h1>Private Route</h1>)}
          />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Public Route/i)).toBeInTheDocument();
    expect(screen.queryByText(/Private Route/i)).not.toBeInTheDocument();
  });

  it('should render FavoriteList component for private route, when user authorized', () => {
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.AUTH},
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <Route exact path="/login"><h1>Public Route</h1></Route>
          <PrivateRouteToFavorite
            exact
            path="/favorites"
            render={() => (<h1>Private Route</h1>)}
          />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Private Route/i)).toBeInTheDocument();
    expect(screen.queryByText(/Public Route/i)).not.toBeInTheDocument();
  });
});

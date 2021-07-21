import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import MainPage from './main-page';
import { AuthorizationStatus } from '../../constants';


let history = null;
let store = null;
const mockStore = configureStore({});


describe('Component: MainPage', () => {
  beforeAll(() => {
    history = createMemoryHistory();
  });

  it('should render correctly', () => {
    store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.AUTH,
      },
      DATA: {
        adsList: [],
        city: 'Paris',
      },
    });
    render(
      <Provider store={store}>
        <Router history={history}>
          <MainPage />
        </Router>
      </Provider>);

    expect(screen.getByTestId(/welcome-screen/i)).toBeInTheDocument();
    expect(screen.getByTestId(/map/i)).toBeInTheDocument();
    expect(screen.getByText(/Cities/i)).toBeInTheDocument();
  });
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import CitiesList from './cities-list';


let history = null;
let store = null;
const mockStore = configureStore({});


describe('Component: CitiesList', () => {
  beforeAll(() => {
    history = createMemoryHistory();
  });

  it('should render correctly cities list', () => {
    store = mockStore({
      DATA: {
        city: 'Paris',
      },
    });
    render(
      <Provider store={store}>
        <Router history={history}>
          <CitiesList />
        </Router>
      </Provider>);

    expect(screen.getByTestId(/cities-list/i)).toBeInTheDocument();
    expect(screen.getByText(/Paris/i)).toBeInTheDocument();
    expect(screen.getByText(/Amsterdam/i)).toBeInTheDocument();
    expect(screen.getByText(/Brussels/i)).toBeInTheDocument();
    expect(screen.getByText(/Hamburg/i)).toBeInTheDocument();
  });
});

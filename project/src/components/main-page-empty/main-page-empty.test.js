import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router} from 'react-router-dom';
import { createMemoryHistory } from 'history';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import MainPageEmpty from './main-page-empty';

const mockStore = configureStore({});

describe('Component: MainPageEmpty', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      DATA: {
        city: 'Amsterdam',
      },
    });
    render(
      <Provider store={store}>
        <Router history={history}>
          <MainPageEmpty />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/No places to stay available/i)).toBeInTheDocument();
    expect(screen.getByText(/We could not find any property available at the moment/i)).toBeInTheDocument();
    expect(screen.getByTestId(/main-page-empty/i)).toBeInTheDocument();
  });
});

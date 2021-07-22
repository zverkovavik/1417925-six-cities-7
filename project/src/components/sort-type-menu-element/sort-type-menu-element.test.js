import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import SortTypeMenuElement from './sort-type-menu-element';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

let history = null;
const mockStore = configureStore({});

const SortType = {
  POPULAR: 'Popular',
  HIGH_TO_LOW: 'Price: high to low',
  LOW_TO_HIGH: 'Price: low to high',
  TOP_RATED_FIRST: 'Top rated first',
};

describe('Component: SortTypeMenuElement', () => {
  beforeAll(() => {
    history = createMemoryHistory();
  });

  it('should render correctly popular sort element', () => {
    const element = SortType.POPULAR;
    render(
      <Provider store={mockStore({
        DATA: {
          sortType: SortType.POPULAR,
        },
      })}
      >
        <Router history={history}>
          <SortTypeMenuElement element={element}/>
        </Router>
      </Provider>);

    expect(screen.getByText(/Popular/i)).toBeInTheDocument();
  });

  it('should render correctly top rated sort element', () => {
    const element = SortType.TOP_RATED_FIRST;
    render(
      <Provider store={mockStore({
        DATA: {
          sortType: SortType.TOP_RATED_FIRST,
        },
      })}
      >
        <Router history={history}>
          <SortTypeMenuElement element={element}/>
        </Router>
      </Provider>);

    expect(screen.getByText(/Top rated first/i)).toBeInTheDocument();
  });

  it('should render correctly low to high sort element', () => {
    const element = SortType.LOW_TO_HIGH;
    render(
      <Provider store={mockStore({
        DATA: {
          sortType: SortType.LOW_TO_HIGH,
        },
      })}
      >
        <Router history={history}>
          <SortTypeMenuElement element={element}/>
        </Router>
      </Provider>);

    expect(screen.getByText(/low to high/i)).toBeInTheDocument();
  });
});

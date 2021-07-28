import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import SortTypeMenu from './sort-type-menu';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

let history = null;
let handleSortTypeElementClick = null;
const mockStore = configureStore({});

const TEST_SORT_TYPE = {
  sortType: 'Price: high to low',
};
describe('Component: SortTypeMenu', () => {
  beforeAll(() => {
    history = createMemoryHistory();
    handleSortTypeElementClick = jest.fn();
  });

  it('should render correctly', () => {
    const { sortType } = TEST_SORT_TYPE;
    render(
      <Provider store={mockStore({
        DATA: {
          sortType: TEST_SORT_TYPE,
        },
      })}
      >
        <Router history={history}>
          <SortTypeMenu
            sortType={sortType}
            handleSortTypeElementClick={handleSortTypeElementClick}
          />
        </Router>
      </Provider>);

    expect(screen.getByTestId(/sort-menu/i)).toBeInTheDocument();
    expect(screen.getByText(/Sort by/i)).toBeInTheDocument();
    expect(screen.getByTestId('sort-type-title')).toBeInTheDocument();
  });
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import SortTypeMenu from './sort-type-menu';

let history = null;

const TEST_SORT_TYPE = {
  sortType: 'Price: high to low',
};
describe('Component: SortTypeMenu', () => {
  beforeAll(() => {
    history = createMemoryHistory();
  });

  it('should render correctly', () => {
    const { sortType } = TEST_SORT_TYPE;
    render(
      <Router history={history}>
        <SortTypeMenu sortType={sortType}/>
      </Router>);

    expect(screen.getByTestId(/sort-menu/i)).toBeInTheDocument();
    expect(screen.getByText(/Sort by/i)).toBeInTheDocument();
    expect(screen.getByText(/high to low/i)).toBeInTheDocument();
  });
});

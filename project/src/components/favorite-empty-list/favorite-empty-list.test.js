import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import FavoriteEmptyList from './favorite-empty-list';
let history = null;

describe('Component: FavoriteEmptyList', () => {
  beforeAll(() => {
    history = createMemoryHistory();
  });

  it('should render correctly if server doesnt return error', () => {
    const isError = false;
    const { getByText, getByTestId } = render(
      <Router history={history}>
        <FavoriteEmptyList isError={isError}/>
      </Router>);

    expect(getByTestId(/favorites-list-is-empty/i)).toBeInTheDocument();
    expect(getByText(/Nothing yet saved/i)).toBeInTheDocument();
    expect(getByText(/Save properties to narrow down search or plan your future trips./i)).toBeInTheDocument();
  });

  it('should render correctly if server return error', () => {
    const isError = true;
    const { getByText, getByTestId } = render(
      <Router history={history}>
        <FavoriteEmptyList isError={isError}/>
      </Router>);

    expect(getByTestId(/favorites-list-is-empty/i)).toBeInTheDocument();
    expect(getByText(/Sorry cant find that!/i)).toBeInTheDocument();
    expect(getByText(/Try again later/i)).toBeInTheDocument();
  });
});

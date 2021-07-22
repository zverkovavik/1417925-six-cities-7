import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import LoadingScreen from './loading-screen';

let history = null;

describe('Component: LoadingScreen', () => {
  beforeAll(() => {
    history = createMemoryHistory();
  });

  it('should render correctly', () => {
    render(
      <Router history={history}>
        <LoadingScreen />
      </Router>);

    expect(screen.getByTestId(/loading-spinner/i)).toBeInTheDocument();
  });
});

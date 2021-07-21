import { render } from '@testing-library/react';
import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Logo from './logo';

let history = null;

describe('Component: Logo', () => {
  beforeAll(() => {
    history = createMemoryHistory();
  });

  it('should render correctly', () => {
    const { getByTestId } = render(
      <Router history={history}>
        <Logo />
      </Router>,
    );

    const logoElement = getByTestId('logo');

    expect(logoElement).toBeInTheDocument();
  });
});

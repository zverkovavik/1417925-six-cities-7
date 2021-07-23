import { render } from '@testing-library/react';
import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Logo from './logo';
import userEvent from '@testing-library/user-event';

let history = null;

describe('Component: Logo', () => {
  beforeAll(() => {
    history = createMemoryHistory();
  });

  it('should render correctly', () => {
    const { getByTestId, getByRole } = render(
      <Router history={history}>
        <Logo />
      </Router>,
    );

    const logoElement = getByTestId('logo');

    expect(logoElement).toBeInTheDocument();
    expect(getByRole('link')).toBeInTheDocument();
    userEvent.click(getByRole('link'));
  });
});

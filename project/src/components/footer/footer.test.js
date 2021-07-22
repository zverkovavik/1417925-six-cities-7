import { render } from '@testing-library/react';
import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Footer from './footer';
import userEvent from '@testing-library/user-event';

let history = null;

describe('Component: Footer', () => {
  beforeAll(() => {
    history = createMemoryHistory();
  });

  it('should render correctly', () => {
    const { getByTestId, getByRole } = render(
      <Router history={history}>
        <Footer />
      </Router>,
    );

    const footerElement = getByTestId('footer');

    expect(footerElement).toBeInTheDocument();
    expect(getByRole('link')).toBeInTheDocument();
    userEvent.click(getByRole('link'));
  });
});

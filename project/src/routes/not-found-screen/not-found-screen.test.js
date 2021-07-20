import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import NotFoundScreen from './not-found-screen';

describe('Component: NotFoundScreen', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={history}>
        <NotFoundScreen />
      </Router>,
    );
    const headerElement = getByText('Ooops.. Error 404. Page not found.');
    const additionalTextElement = getByText('Press on the logo to return on the main page');

    expect(headerElement).toBeInTheDocument();
    expect(additionalTextElement).toBeInTheDocument();
  });
});

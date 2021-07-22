import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import userEvent from '@testing-library/user-event';
import NewCommentForm from './new-comment-form';

let history = null;
let store = null;
const mockStore = configureStore({});

describe('Component: NewCommentForm', () => {
  beforeAll(() => {
    history = createMemoryHistory();
  });

  it('should render correctly', () => {
    store = mockStore({});
    render(
      <Provider store={store}>
        <Router history={history}>
          <NewCommentForm />
        </Router>
      </Provider>);

    expect(screen.getByText(/Your review/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByTestId(/post-new-comment/i)).toBeInTheDocument();
    expect(screen.getByText(/To submit review please make sure to set/i)).toBeInTheDocument();

    expect(screen.getByPlaceholderText(/Tell how was your stay, what you like and what can be improved/i)).toBeInTheDocument();

    userEvent.type(screen.getByTestId(/comment-text/i), 'Highly recommend');
    expect(screen.getByDisplayValue(/Highly recommend/i)).toBeInTheDocument();
  });
});

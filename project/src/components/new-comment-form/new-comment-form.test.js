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

  it('should render correctly', async () => {
    store = mockStore({});
    render(
      <Provider store={store}>
        <Router history={history}>
          <NewCommentForm />
        </Router>
      </Provider>);

    await userEvent.type(screen.getByTestId(/comment-text/i), 'Highly recommend');
    expect(screen.getByText(/Your review/i)).toBeInTheDocument();
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
    expect(screen.getByText(/To submit review please make sure to set/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Tell how was your stay, what you like and what can be improved/i)).toBeInTheDocument();

    setTimeout(() => {
      expect(screen.getByText(/Highly recommend/i)).toBeInTheDocument();
    }, 5000);
  });
});

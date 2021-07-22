import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Review from './review';

let history = null;
const TEST_COMMENT = {
  id: 34,
  comment: 'Highly recommend',
  date: '2019-05-08T14:13:56.569Z',
  rating: 4,
  avatarUrl: 'img/1.png',
  authorName: 'Vasya',
};

describe('Component: Review', () => {
  beforeAll(() => {
    history = createMemoryHistory();
  });

  it('should render correctly', () => {
    const { id, comment, date, rating, avatarUrl, authorName } = TEST_COMMENT;
    render(
      <Router history={history}>
        <Review
          comment = {comment}
          date = {date}
          rating = {rating}
          avatarUrl = {avatarUrl}
          authorName = {authorName}
          key = {comment + id}
        />
      </Router>);

    expect(screen.getByText(/Rating/i)).toBeInTheDocument();
    expect(screen.getByTestId(/comment-list/i)).toBeInTheDocument();
    expect(screen.getByText(/Highly recommend/i)).toBeInTheDocument();
    expect(screen.getByTestId(/review-author/i)).toHaveTextContent('Vasya');
    expect(screen.getByAltText(/Reviews avatar/i)).toBeInTheDocument();
  });
});

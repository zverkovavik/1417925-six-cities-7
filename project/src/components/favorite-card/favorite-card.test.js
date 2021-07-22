import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import FavoriteCard from './favorite-card';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { AuthorizationStatus } from '../../constants';
import userEvent from '@testing-library/user-event';

let history = null;
const TEST_CARD = {
  bedrooms: 1,
  name: 'Amsterdam',
  id: 1,
  'isFavorite': true,
  'isPremium': true,
  'previewImage': 'img/room.jpg',
  price: 80,
  rating: 4,
  title: 'Amazing view',
  type: 'House',

};
const mockStore = configureStore({});
let store = null;

describe('Component: FavoriteCard', () => {
  beforeAll(() => {
    history = createMemoryHistory();
    store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
      },
      DATA: {
        activeCardId: 1,
      },
    });
  });

  it('should render correctly', () => {
    const { id, isPremium, previewImage, price, isFavorite, rating, title, type } = TEST_CARD;
    render(
      <Provider store={store}>
        <Router history={history}>
          <FavoriteCard
            id = {id}
            isPremium = {isPremium}
            rating = {rating}
            previewImage={previewImage}
            price={price}
            isFavorite={isFavorite}
            title={title}
            type={type}
            key = {title + id}
          />
        </Router>
      </Provider>);

    expect(screen.getByText(/Rating/i)).toBeInTheDocument();
    expect(screen.getByText(/Premium/i)).toBeInTheDocument();
    expect(screen.getByText(/Amazing view/i)).toBeInTheDocument();
    expect(screen.getByText(/In bookmarks/i)).toBeInTheDocument();
    expect(screen.getByText(/House/i)).toBeInTheDocument();


    const [firstLink, secondLink] = screen.queryAllByRole('link');

    userEvent.click(firstLink);
    userEvent.click(secondLink);
  });
});

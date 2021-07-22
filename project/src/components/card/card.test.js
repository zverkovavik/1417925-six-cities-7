import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Card from './card';
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
  title: 'Wood and stone place',
  type: 'Private room',

};
const mockStore = configureStore({});
let store = null;

describe('Component: Card', () => {
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
          <Card
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

    expect(screen.getByText(/Premium/i)).toBeInTheDocument();
    expect(screen.getByText(/Wood and stone place/i)).toBeInTheDocument();
    expect(screen.getByText(/To bookmarks/i)).toBeInTheDocument();
    expect(screen.getByText(/Private room/i)).toBeInTheDocument();


    const [firstLink, secondLink] = screen.queryAllByRole('link');

    userEvent.click(firstLink);
    userEvent.click(secondLink);
  });
});

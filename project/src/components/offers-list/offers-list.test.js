import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import OffersList from './offers-list';
import { AuthorizationStatus } from '../../constants';

let history = null;
let store = null;
const mockStore = configureStore({});
const TEST_CARD =  {
  id: 1,
  city: {
    name: 'London',
  },
  'isFavorite': true,
  'isPremium': false,
  'previewImage': 'img/room.jpg',
  price: 80,
  rating: 4,
  title: 'Wood and stone place',
  type: 'Private room',
};

describe('Component: OffersList', () => {
  beforeAll(() => {
    history = createMemoryHistory();
  });

  it('should render correctly', () => {
    store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.AUTH,
      },
      DATA: {
        city: 'London',
        cards: [TEST_CARD],
        sortType: 'Popular',
      },
    });
    render(
      <Provider store={store}>
        <Router history={history}>
          <OffersList />
        </Router>
      </Provider>);

    expect(screen.getByTestId(/offers-list/i)).toBeInTheDocument();
    expect(screen.getByText(/1 places to stay in London/i)).toBeInTheDocument();
  });
});

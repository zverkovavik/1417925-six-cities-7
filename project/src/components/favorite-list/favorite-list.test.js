import React from 'react';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import FavoriteList from './favorite-list';
import { AuthorizationStatus } from '../../constants';
import { createAPI } from '../../services/api';
import thunk from 'redux-thunk';

const TEST_FAVORITE_LIST = [
  {
    bedrooms: 1,
    city: {
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10,
      },
      name: 'Amsterdam',
      id: 1,
      'isFavorite': true,
      'isPremium': false,
      'previewImage': 'img/room.jpg',
      price: 80,
      rating: 4,
      title: 'Wood and stone place',
      type: 'Private room',
    },
  },
  {
    bedrooms: 1,
    city: {
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10,
      },
      name: 'Amsterdam',
    },
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    goods: ['Heating', 'Kitchen', 'Cable TV', 'Dishwasher'],
    host: {
      'avatar_url': 'img/avatar-angelina.jpg',
      id: 3,
      'is_pro': true,
      userName: 'Angelina',
    },
    id: 1,
    images: ['img/room.jpg'],
    'isFavorite': true,
    'isPremium': false,
    location: {
      latitude: 52.35514938496378,
      longitude: 4.673877537499948,
      zoom: 8,
    },
    'max_adults': 3,
    'previewImage': 'img/room.jpg',
    price: 80,
    rating: 4,
    title: 'Wonderful place',
    type: 'Private room',
  },
];

let history = null;
let store = null;


describe('Component: FavoriteList', () => {
  beforeEach(() => {
    history = createMemoryHistory();
    const api = createAPI(() => {});
    const createFakeStore = configureStore([thunk.withExtraArgument(api)]);
    store = createFakeStore({
      USER: {
        authorizationStatus: AuthorizationStatus.AUTH,
      },
      DATA: {
        cards: TEST_FAVORITE_LIST,
        favoriteList: [],
        city: 'Amsterdam',
      },
    });

  });

  it('should render loading screen while FavoriteList component is loading', () => {

    render(
      <Provider store={store}>
        <Router history={history}>
          <FavoriteList />
        </Router>
      </Provider>);

    expect(screen.getByTestId(/loading-spinner/i)).toBeInTheDocument();
  });

});


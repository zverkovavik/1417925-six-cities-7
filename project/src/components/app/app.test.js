import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { AuthorizationStatus } from '../../constants';
import App from './app';
import thunk from 'redux-thunk';
import { createAPI } from '../../services/api';

let history = null;
let store = null;
let fakeApp = null;

const AMSTERDAM_TEST_CARD =  {
  bedrooms: 1,
  city: {
    location: {
      latitude: 52.370216,
      longitude: 4.895168,
      zoom: 10,
      name: 'Amsterdam',
    },
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
  isFavorite: true,
  isPremium: false,
  location: {
    latitude: 52.35514938496378,
    longitude: 4.673877537499948,
    zoom: 8,
  },
  maxAdults: 3,
  previewImage: 'img/room.jpg',
  price: 80,
  rating: 4,
  title: 'Wood and stone place',
  type: 'Private room',
};

const FIRST_PARIS_TEST_CARD =  {
  bedrooms: 1,
  city: {
    location: {
      latitude: 52.370216,
      longitude: 4.895168,
      zoom: 10,
      name: 'Paris',
    },
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
  isFavorite: true,
  isPremium: false,
  location: {
    latitude: 52.35514938496378,
    longitude: 4.673877537499948,
    zoom: 8,
  },
  maxAdults: 3,
  previewImage: 'img/room.jpg',
  price: 80,
  rating: 4,
  title: 'Wood and stone place',
  type: 'Private room',
};

const SECOND_PARIS_TEST_CARD =  {
  bedrooms: 1,
  city: {
    location: {
      latitude: 52.370216,
      longitude: 4.895168,
      zoom: 10,
      name: 'Paris',
    },
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
  isFavorite: true,
  isPremium: false,
  location: {
    latitude: 52.35514938496378,
    longitude: 4.673877537499948,
    zoom: 8,
  },
  maxAdults: 3,
  previewImage: 'img/room.jpg',
  price: 50,
  rating: 5,
  title: 'Wood and stone place',
  type: 'Private room',
};

const TEST_CARD_ARRAY = [
  AMSTERDAM_TEST_CARD,
  FIRST_PARIS_TEST_CARD,
  SECOND_PARIS_TEST_CARD,
];

let api = null;

describe('Application Routing', () => {
  beforeAll(() => {
    history = createMemoryHistory();
    api = createAPI(() => {});
    const createFakeStore = configureStore([thunk.withExtraArgument(api)]);
    store = createFakeStore({
      USER: {
        authorizationStatus: AuthorizationStatus.AUTH,
        login: 'larryPage@gmail.com',
      },
      DATA: {
        cards: TEST_CARD_ARRAY,
        city: 'Paris',
        adsList: TEST_CARD_ARRAY,
        isDataLoaded: true,
        apartmentsNear: [],
        activeCard: FIRST_PARIS_TEST_CARD,
        favoriteList: [FIRST_PARIS_TEST_CARD],
        reviews: [],
        sortType: 'Popular',
      },
    });

    fakeApp = (
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>
    );
  });

  it('should render "NotFoundScreen" when user navigate to /not-found', () => {
    history.push('/not-found');
    render(fakeApp);

    expect(screen.getByText('Ooops.. Error 404. Page not found.')).toBeInTheDocument();
    expect(screen.getByText('Press on the logo to return on the main page')).toBeInTheDocument();
  });
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Room from './room';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { AuthorizationStatus } from '../../constants';
import userEvent from '@testing-library/user-event';
import { createAPI } from '../../services/api';
import thunk from 'redux-thunk';

const TEST_APARTMENT_NEAR_CARD = {
  bedrooms: 1,
  city: {
    location: {
      latitude: 52.370216,
      longitude: 4.895168,
      zoom: 10,
    },
    name: 'Amsterdam',
  },
  name: 'Amsterdam',
  id: 1,
  'isFavorite': true,
  'isPremium': true,
  'previewImage': 'img/room.jpg',
  price: 1000,
  rating: 5,
  title: 'Exciting memories for you',
  type: 'Palace',
  location: {
    latitude: 52.35514938496378,
    longitude: 4.673877537499948,
    zoom: 8,
  },
};

const TEST_CARD = {
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
  'is_favorite': true,
  'is_premium': false,
  location: {
    latitude: 52.355496378,
    longitude: 4.67387753948,
    zoom: 8,
  },
  'max_adults': 3,
  'preview_image': 'img/room.jpg',
  price: 80,
  rating: 4,
  title: 'Wood and stone place',
  type: 'Private room',
};

const TEST_COMMENT = {
  id: 2,
  comment: 'Highly recommend, wonderfull place with unbelievable view',
  date: '2019-05-08T14:13:56.569Z',
  rating: 5,
  user: {
    avatarUrl: 'img/1.png',
    authorName: 'Alesha',
  },
};

const TEST_CARDS = [
  TEST_APARTMENT_NEAR_CARD,
  TEST_CARD,
  {
    city: {
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10,
      },
      name: 'Brussells',
    },
    location: {
      latitude: 52.370216,
      longitude: 4.895168,
      zoom: 10,
    },
  },
  {
    city: {
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10,
      },
      name: 'Berlin',
    },
    location: {
      latitude: 52.370216,
      longitude: 4.895168,
      zoom: 10,
    },
  },
  {
    city: {
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10,
      },
      name: 'New York',
    },
    location: {
      latitude: 52.370216,
      longitude: 4.895168,
      zoom: 10,
    },
  },
];

let mockStore = null;
let store = null;
let history = null;

describe('Component: Room', () => {
  beforeAll(() => {
    const api = createAPI(() => {});
    mockStore = configureStore([thunk.withExtraArgument(api)]);
    history = createMemoryHistory();
  });

  it('should render correctly if user not logged in', () => {
    store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
      },
      DATA: {
        city: 'Amsterdam',
        cards: TEST_CARDS,
        activeCard: TEST_CARD,
        apartmentsNear: [],
        reviews: [TEST_COMMENT],
      },
    });
    render(
      <Provider store={store}>
        <Router history={history}>
          <Room/>
        </Router>
      </Provider>);

    expect(screen.getByText(/Wood and stone place/i)).toBeInTheDocument();
    expect(screen.getByText(/To bookmarks/i)).toBeInTheDocument();
    expect(screen.getByText(/Private room/i)).toBeInTheDocument();
    expect(screen.getByText(/Highly recommend, wonderfull place with unbelievable view/i)).toBeInTheDocument();
    expect(screen.getByText(/Alesha/i)).toBeInTheDocument();
    expect(screen.getByText(/May/i)).toBeInTheDocument();
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
  });

  it('should render correctly if user logged in', () => {
    store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.AUTH,
      },
      DATA: {
        city: 'Amsterdam',
        cards: TEST_CARDS,
        activeCard: TEST_CARD,
        apartmentsNear: [],
        reviews: [TEST_COMMENT],
      },
    });
    render(
      <Provider store={store}>
        <Router history={history}>
          <Room/>
        </Router>
      </Provider>);

    expect(screen.getByText(/Wood and stone place/i)).toBeInTheDocument();
    expect(screen.getByText(/To bookmarks/i)).toBeInTheDocument();
    expect(screen.getByText(/Private room/i)).toBeInTheDocument();
    expect(screen.getByText(/Highly recommend, wonderfull place with unbelievable view/i)).toBeInTheDocument();
    expect(screen.getByText(/Alesha/i)).toBeInTheDocument();
    expect(screen.getByText(/May/i)).toBeInTheDocument();
    expect(screen.getByTestId(/leaflet-map/i)).toBeInTheDocument();
    userEvent.type(screen.getByTestId(/comment-text/i), 'Highly recommend');
    expect(screen.getByDisplayValue(/Highly recommend/i)).toBeInTheDocument();
  });

  it('should render correctly if we have apartments near', () => {
    store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
      },
      DATA: {
        city: 'Amsterdam',
        cards: TEST_CARDS,
        activeCard: TEST_CARD,
        apartmentsNear: [TEST_APARTMENT_NEAR_CARD],
        reviews: [],
      },
    });
    render(
      <Provider store={store}>
        <Router history={history}>
          <Room/>
        </Router>
      </Provider>);

    expect(screen.getByText(/Other places in the neighbourhood/i)).toBeInTheDocument();
    expect(screen.getByText(/Exciting memories for you/i)).toBeInTheDocument();
    expect(screen.getByText(/1000/i)).toBeInTheDocument();
  });
});

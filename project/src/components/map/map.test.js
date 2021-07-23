import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Map from './map';

let history = null;
let store = null;
const mockStore = configureStore({});

const AMSTERDAM_TEST_CARD =  {
  id: 56,
  city: {
    location: {
      latitude: 52.370216,
      longitude: 4.895168,
      zoom: 10,
    },
    name: 'Amsterdam',
  },
  location: {
    latitude: 52.370216,
    longitude: 4.895168,
    zoom: 10,
  },
};

const FIRST_PARIS_TEST_CARD =  {
  id: 12,
  city: {
    location: {
      latitude: 52.370216,
      longitude: 4.895168,
      zoom: 10,
    },
    name: 'Paris',
  },
  location: {
    latitude: 52.370216,
    longitude: 4.895168,
    zoom: 10,
  },
};

const SECOND_PARIS_TEST_CARD =  {
  id: 1,
  city: {
    location: {
      latitude: 52.370216,
      longitude: 4.895168,
      zoom: 10,
    },
    name: 'Paris',
  },
  location: {
    latitude: 52.370216,
    longitude: 4.895168,
    zoom: 10,
  },
};

const TEST_CARD_ARRAY = [AMSTERDAM_TEST_CARD, FIRST_PARIS_TEST_CARD, SECOND_PARIS_TEST_CARD];
const adsList = [FIRST_PARIS_TEST_CARD, SECOND_PARIS_TEST_CARD];
describe('Component: Map', () => {
  beforeAll(() => {
    history = createMemoryHistory();
  });

  it('should render correctly', () => {
    store = mockStore({
      DATA: {
        city: 'Paris',
        cards: TEST_CARD_ARRAY,
        adsList: [FIRST_PARIS_TEST_CARD, SECOND_PARIS_TEST_CARD],
        activeCardId: 12,
      },
    });
    render(
      <Provider store={store}>
        <Router history={history}>
          <Map adsList={adsList}/>
        </Router>
      </Provider>);

    expect(screen.getByTestId(/leaflet-map/i)).toBeInTheDocument();
  });
});

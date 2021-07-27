import { data } from './data';
import { ActionType } from '../action';
import { adaptToClient, adaptToClientCardsArray, adaptToClientReviewsArray } from '../../utils/adapter';

const initialState = {
  city: 'Paris',
  cards: [],
  isDataLoaded: false,
  activeCard: null,
  activeCardId: 0,
  favoriteList: [],
  apartmentsNear: [],
  reviews: [],
  sortType: 'Popular',
};

const AMSTERDAM_TEST_CARD =  {
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
    latitude: 52.35514938496378,
    longitude: 4.673877537499948,
    zoom: 8,
  },
  'max_adults': 3,
  'preview_image': 'img/room.jpg',
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
  'is_favorite': true,
  'is_premium': false,
  location: {
    latitude: 52.35514938496378,
    longitude: 4.673877537499948,
    zoom: 8,
  },
  'max_adults': 3,
  'preview_image': 'img/room.jpg',
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
  'is_favorite': true,
  'is_premium': false,
  location: {
    latitude: 52.35514938496378,
    longitude: 4.673877537499948,
    zoom: 8,
  },
  'max_adults': 3,
  'preview_image': 'img/room.jpg',
  price: 50,
  rating: 5,
  title: 'Wood and stone place',
  type: 'Private room',
};

const TEST_CARD_ARRAY = [AMSTERDAM_TEST_CARD, FIRST_PARIS_TEST_CARD, SECOND_PARIS_TEST_CARD];

describe('Reducer: data', () => {
  it('without additional parameters should return initial state', () => {
    expect(data(undefined, {}))
      .toEqual(initialState);
  });

  it('should update cards by load cards', () => {
    const state = {city: 'Amsterdam', cards: [], isDataLoaded: false};
    const loadAdCardsAction = {
      type: ActionType.LOAD_AD_CARDS,
      payload: TEST_CARD_ARRAY,
    };

    expect(data(state, loadAdCardsAction))
      .toEqual({city: 'Amsterdam', cards: adaptToClientCardsArray(TEST_CARD_ARRAY), isDataLoaded: true});
  });


  it('should update city name', () => {
    const state = {
      city: 'Paris',
      cards: adaptToClientCardsArray(TEST_CARD_ARRAY),
      sortType: 'Price: high to low',
    };

    const changeCityAction = {
      type: ActionType.CHANGE_CITY,
      payload: 'Amsterdam',
    };

    expect(data(state, changeCityAction))
      .toEqual({
        city: 'Amsterdam',
        cards: adaptToClientCardsArray(TEST_CARD_ARRAY),
        sortType: 'Price: high to low',
      });
  });

  it('should return one loaded card', () => {
    const state = { activeCard: null };

    const loadCardAction = {
      type: ActionType.LOAD_ONE_CARD,
      payload: AMSTERDAM_TEST_CARD,
    };

    expect(data(state, loadCardAction))
      .toEqual({activeCard: adaptToClient(AMSTERDAM_TEST_CARD) });
  });

  it('should load apartments near', () => {
    const state = { apartmentsNear: [] };

    const loadApartmentsNearAction = {
      type: ActionType.LOAD_APARTMENTS_NEAR,
      payload: TEST_CARD_ARRAY,
    };

    expect(data(state, loadApartmentsNearAction))
      .toEqual({apartmentsNear: adaptToClientCardsArray(TEST_CARD_ARRAY)});
  });

  it('should load favorite list', () => {
    const state = { favoriteList: [] };

    const loadFavoriteListAction = {
      type: ActionType.LOAD_FAVORITE_LIST,
      payload: TEST_CARD_ARRAY,
    };

    expect(data(state, loadFavoriteListAction))
      .toEqual({favoriteList: adaptToClientCardsArray(TEST_CARD_ARRAY) });
  });

  it('should load reviews', () => {
    const state = { reviews: [] };

    const TEST_REVIEWS = [
      {
        comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
        date: '2019-09-08T14:13:56.569Z',
        id: 2,
        rating: 5,
        user: {
          'avatar_url': 'img/1.png',
          id: 4,
          'is_pro': false,
          name: '',
        },
      },
      {
        comment: '',
        date: '2019-07-08T14:13:56.569Z',
        id: 1,
        rating: 4,
        user: {
          'avatar_url': '',
          id: 4,
          'is_pro': false,
          name: '',
        },
      },
    ];

    const loadReviewsAction = {
      type: ActionType.LOAD_REVIEWS,
      payload: TEST_REVIEWS,
    };

    expect(data(state, loadReviewsAction))
      .toEqual({reviews: adaptToClientReviewsArray(TEST_REVIEWS)});
  });

  it('should update sort type', () => {
    const state = {
      city: 'Paris',
      cards: [],
      sortType: 'Popular',
    };

    const setSortTypeAction = {
      type: ActionType.SET_SORT_TYPE,
      payload: 'Price: high to low',
    };

    expect(data(state, setSortTypeAction))
      .toEqual({
        city: 'Paris',
        sortType: 'Price: high to low',
        cards: [],
      });
  });


  it('should update active card id', () => {
    const state = { activeCardId: 0 };

    const setActiveCardAction = {
      type: ActionType.SET_ACTIVE_CARD,
      payload: 14,
    };

    expect(data(state, setActiveCardAction))
      .toEqual({ activeCardId: 14 });
  });

  it('should return active card id to initial state (0)', () => {
    const state = { activeCardId: 16 };

    const resetActiveCardAction = {
      type: ActionType.RESET_ACTIVE_CARD,
    };

    expect(data(state, resetActiveCardAction))
      .toEqual({ activeCardId: 0 });
  });
});



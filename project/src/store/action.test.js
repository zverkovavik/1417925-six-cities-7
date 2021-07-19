import
{
  changeCity,
  loadAdCards,
  loadOneCard,
  loadApartmentsNear,
  loadFavoriteList,
  updateFavoriteList,
  loadReviews,
  setEmail,
  requireAuthorization,
  logoutApp,
  redirectToRoute,
  setActiveCard,
  resetActiveCard,
  setSortType,
  resetSortType,
  ActionType
} from './action';

const TEST_CARD =  {
  bedrooms: 1,
  city: {
    location: {
      latitude: 52.370216,
      longitude: 4.895168,
      zoom: 10,
    },
    city: 'Amsterdam',
  },
  description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
  goods: ['Heating', 'Kitchen', 'Cable TV', 'Dishwasher'],
  host: {
    avatarUrl: 'img/avatar-angelina.jpg',
    id: 3,
    isPro: true,
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

const TEST_CARD_ARRAY = [TEST_CARD];

describe('Actions', () => {
  it('Action creator for changing chosen city returns correct action with payload containing city name string.', () => {
    const TEST_CITY = 'Paris';

    const expectedAction = {
      type: ActionType.CHANGE_CITY,
      payload: TEST_CITY,
    };

    expect(changeCity(TEST_CITY)).toEqual(expectedAction);
  });

  it('Action creator for loading ad cards returns correct action with payload containing ad card objects in an array', () => {

    const expectedAction = {
      type: ActionType.LOAD_AD_CARDS,
      payload: TEST_CARD_ARRAY,
    };
    expect(loadAdCards(TEST_CARD_ARRAY)).toEqual(expectedAction);
  });

  it('Action creator for loading one ad card returns correct action with payload containing ad card object', () => {

    const expectedAction = {
      type: ActionType.LOAD_ONE_CARD,
      payload: TEST_CARD,
    };

    expect(loadOneCard(TEST_CARD)).toEqual(expectedAction);
  });

  it('Action creator for loading apartments near cards returns correct action with payload containing three ad card objects in array', () => {
    const MOCK = [TEST_CARD, TEST_CARD, TEST_CARD];

    const expectedAction = {
      type: ActionType.LOAD_APARTMENTS_NEAR,
      payload: MOCK,
    };
    expect(loadApartmentsNear(MOCK)).toEqual(expectedAction);
  });

  it('Action creator for loading favorite list returns correct action with payload containing ad card objects in an array', () => {
    const expectedAction = {
      type: ActionType.LOAD_FAVORITE_LIST,
      payload: TEST_CARD_ARRAY,
    };
    expect(loadFavoriteList(TEST_CARD_ARRAY)).toEqual(expectedAction);
  });

  it('Action creator for updating favorite list returns correct action with payload containing updated card', () => {
    const expectedAction = {
      type: ActionType.UPDATE_FAVORITE_LIST,
      payload: TEST_CARD,
    };
    expect(updateFavoriteList(TEST_CARD)).toEqual(expectedAction);
  });

  it('Action creator for loading reviews returns correct action with payload containing review objects in an array', () => {
    const TEST_REVIEWS = [
      {
        comment: '',
        date: '',
        id: 1,
        ratingInReview: 4,
        user: {
          avatarUrl: '',
          id: 4,
          isPro: false,
          authorName: '',
        },
      },
    ];

    const expectedAction = {
      type: ActionType.LOAD_REVIEWS,
      payload: TEST_REVIEWS,
    };

    expect(loadReviews(TEST_REVIEWS)).toEqual(expectedAction);
  });

  it('Action creator for set user email returns action with payload containing user email', () => {

    const TEST_EMAIL = 'torvalds@osdl.org';

    const expectedAction = {
      type: ActionType.SET_EMAIL,
      payload: TEST_EMAIL,
    };
    expect(setEmail(TEST_EMAIL)).toEqual(expectedAction);
  });

  it('Action creator for authorization request returns action with payload', () => {

    const AUTHORIZATION_STATUS = 'NO_AUTH';

    const expectedAction = {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AUTHORIZATION_STATUS,
    };
    expect(requireAuthorization(AUTHORIZATION_STATUS)).toEqual(expectedAction);
  });

  it('Action creator for logout returns action without payload', () => {
    const expectedAction = {
      type: ActionType.LOGOUT,
    };
    expect(logoutApp()).toEqual(expectedAction);
  });

  it('Action creator for redirect user to route returns action url in payload', () => {
    const TEST_URL = '/favorite';
    const expectedAction = {
      type: ActionType.REDIRECT_TO_ROUTE,
      payload: TEST_URL,
    };

    expect(redirectToRoute(TEST_URL)).toEqual(expectedAction);
  });

  it('Action creator for set active card returns action with card id in payload', () => {
    const TEST_CARD_ID = '55';
    const expectedAction = {
      type: ActionType.SET_ACTIVE_CARD,
      payload: TEST_CARD_ID,
    };
    expect(setActiveCard(TEST_CARD_ID)).toEqual(expectedAction);
  });

  it('Action creator for reset active card returns action without payload', () => {
    const expectedAction = {
      type: ActionType.RESET_ACTIVE_CARD,
    };
    expect(resetActiveCard()).toEqual(expectedAction);
  });

  it('Action creator for set sort type returns action with payload containing sort type', () => {

    const TEST_SORT_TYPE = 'Popular';

    const expectedAction = {
      type: ActionType.SET_SORT_TYPE,
      payload: TEST_SORT_TYPE,
    };
    expect(setSortType(TEST_SORT_TYPE)).toEqual(expectedAction);
  });

  it('Action creator for reset sort type returns action without payload', () => {
    const expectedAction = {
      type: ActionType.RESET_SORT_TYPE,
    };
    expect(resetSortType()).toEqual(expectedAction);
  });

});

import { ActionType } from './action';
import { Cities, AuthorizationStatus } from '../constants';
import { adaptToClient, filterCardsByCurrentCity } from '../utils';
import { Reviews } from '../components/mocks/reviews';

const initialState = {
  city: Cities.PARIS,
  cards: [],
  adsList: [],
  authorizationStatus: AuthorizationStatus.UNKNOWN,
  isDataLoaded: false,
  login: '',
  activeCardId: 0,
  reviews: Reviews,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return {
        ...state,
        city: action.payload,
        adsList: filterCardsByCurrentCity(state.cards, action.payload),
      };
    case ActionType.LOAD_AD_CARDS:
      return {
        ...state,
        cards: adaptToClient(action.payload),
        adsList: filterCardsByCurrentCity(adaptToClient(action.payload), state.city),
        isDataLoaded: true,
      };
    case ActionType.REQUIRED_AUTHORIZATION:
      return {
        ...state,
        authorizationStatus: action.payload,
      };
    case ActionType.SET_EMAIL:
      return {
        ...state,
        login: action.payload,
      };
    case ActionType.LOGOUT:
      return {
        ...state,
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        login: '',
      };
    case ActionType.SET_ACTIVE_CARD:
      return {
        ...state,
        activeCardId: action.payload,
      };
    case ActionType.LOAD_REVIEWS:
      return {
        ...state,
        reviews: action.payload,
      };
    case ActionType.RESET_ACTIVE_CARD:
      return {
        ...state,
        activeCardId: action.payload,
      };
    default:
      return state;
  }
};

export { reducer };

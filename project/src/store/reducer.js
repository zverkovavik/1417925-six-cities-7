import { ActionType } from './action';
import { Cities, AuthorizationStatus } from '../constants';
import { adaptToClient } from '../utils';

const filterCardsByCurrentCity = (cards, city) => cards.filter((card) => city === card.city.name);

const initialState = {
  city: Cities.PARIS,
  cards: [],
  adsList: [],
  authorizationStatus: AuthorizationStatus.UNKNOWN,
  isDataLoaded: false,
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
    case ActionType.LOGOUT:
      return {
        ...state,
        authorizationStatus: AuthorizationStatus.NO_AUTH,
      };
    default:
      return state;
  }
};

export { reducer };

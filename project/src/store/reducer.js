import { ActionType } from './action';
import { City, AuthorizationStatus, SortType } from '../constants';
import { adaptToClient, filterCardsByCurrentCity, setSortType } from '../utils';
import { Reviews } from '../components/mocks/reviews';

const EMPTY_ACTIVE_CARD = 0;

const initialState = {
  city: City.PARIS,
  cards: [],
  adsList: [],
  primarySortAdsList: [],
  authorizationStatus: AuthorizationStatus.UNKNOWN,
  isDataLoaded: false,
  login: '',
  activeCardId: EMPTY_ACTIVE_CARD,
  reviews: Reviews,
  isSortMenuShow: false,
  sortTypeName: SortType.POPULAR,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return {
        ...state,
        city: action.payload,
        sortTypeName: SortType.POPULAR,
        adsList: filterCardsByCurrentCity(state.cards, action.payload),
        primarySortAdsList: filterCardsByCurrentCity(state.cards, action.payload),
      };
    case ActionType.LOAD_AD_CARDS:
      return {
        ...state,
        cards: adaptToClient(action.payload),
        adsList: filterCardsByCurrentCity(adaptToClient(action.payload), state.city),
        primarySortAdsList: filterCardsByCurrentCity(adaptToClient(action.payload), state.city),
        isDataLoaded: true,
      };
    case ActionType.REQUIRED_AUTHORIZATION:
      return {
        ...state,
        sortTypeName: SortType.POPULAR,
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
        sortTypeName: SortType.POPULAR,
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
        activeCardId: EMPTY_ACTIVE_CARD,
      };
    case ActionType.SHOW_SORT_MENU:
      return {
        ...state,
        isSortMenuShow: true,
      };
    case ActionType.RESET_SORT_MENU:
      return {
        ...state,
        isSortMenuShow: false,
      };
    case ActionType.SET_SORT_TYPE:
      return {
        ...state,
        sortTypeName: action.payload,
        adsList: setSortType(state.primarySortAdsList, state.sortType, action.payload),
      };
    default:
      return state;
  }
};

export { reducer };

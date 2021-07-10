import { ActionType } from './action';
import { City, AuthorizationStatus, SortType } from '../constants';
import { adaptToClient, adaptToClientCardsArray, setSortType } from '../utils/utils';
import { filterCardsByCurrentCity } from '../routes/main-page/selectors';

const EMPTY_ACTIVE_CARD = 0;

const initialState = {
  city: City.PARIS,
  cards: [],
  adsList: [],
  authorizationStatus: AuthorizationStatus.UNKNOWN,
  isDataLoaded: false,
  login: '',
  activeCardId: EMPTY_ACTIVE_CARD,
  activeCard: null,
  favoriteList: [],
  apartmentsNear: [],
  reviews: [],
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
      };
    case ActionType.LOAD_AD_CARDS:
      return {
        ...state,
        cards: adaptToClientCardsArray(action.payload),
        adsList: filterCardsByCurrentCity(adaptToClientCardsArray(action.payload), state.city),
        isDataLoaded: true,
      };
    case ActionType.LOAD_ONE_CARD:
      return {
        ...state,
        activeCard: adaptToClient(action.payload),
      };
    case ActionType.LOAD_APARTMENTS_NEAR:
      return {
        ...state,
        apartmentsNear: adaptToClientCardsArray(action.payload),
      };
    case ActionType.LOAD_FAVORITE_LIST:
      return {
        ...state,
        favoriteList: action.payload,
      };
    case ActionType.CHANGE_FAVORITE_LIST:
      return {
        ...state,
        // не реализован
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
    case ActionType.POST_COMMENT:
      return {
        ...state,
        reviews: action.payload,
      };
    case ActionType.RESET_ACTIVE_CARD:
      return {
        ...state,
        activeCardId: EMPTY_ACTIVE_CARD,
      };
    case ActionType.SET_SORT_TYPE:
      return {
        ...state,
        sortTypeName: action.payload,
        adsList: setSortType(filterCardsByCurrentCity(state.cards, state.city), state.sortType, action.payload),
      };
    default:
      return state;
  }
};

export { reducer };

import { createReducer } from '@reduxjs/toolkit';
import { adaptToClient, adaptToClientCardsArray, adaptToClientReviewsArray } from '../../utils/adapter';
import { updateCards } from './selectors';
import { changeCity, loadAdCards, loadReviews, loadOneCard, loadFavoriteList, loadApartmentsNear, updateFavoriteList, setSortType, resetSortType, setActiveCard, resetActiveCard  } from '../action';
import { City, SortType } from '../../constants';

const EMPTY_ACTIVE_CARD = 0;

const initialState = {
  city: City.PARIS,
  cards: [],
  isDataLoaded: false,
  activeCard: null,
  activeCardId: EMPTY_ACTIVE_CARD,
  favoriteList: [],
  apartmentsNear: [],
  reviews: [],
  sortType: SortType.POPULAR,
};

const data = createReducer(initialState, (builder) => {
  builder
    .addCase(loadAdCards, (state, action) => {
      state.cards = adaptToClientCardsArray(action.payload);
      state.isDataLoaded = true;
    })
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(loadOneCard, (state, action) => {
      state.activeCard = adaptToClient(action.payload);
    })
    .addCase(loadApartmentsNear, (state, action) => {
      state.apartmentsNear = adaptToClientCardsArray(action.payload);
    })
    .addCase(loadFavoriteList, (state, action) => {
      state.favoriteList = adaptToClientCardsArray(action.payload);
    })
    .addCase(updateFavoriteList, (state, action) => {
      state.cards = updateCards(state.cards, adaptToClient(action.payload));
      state.apartmentsNear = updateCards(state.apartmentsNear, adaptToClient(action.payload));
    })
    .addCase(loadReviews, (state, action) => {
      state.reviews = adaptToClientReviewsArray(action.payload);
    })
    .addCase(setSortType, (state, action) => {
      state.sortType = action.payload;
    })
    .addCase(resetSortType, (state) => {
      state.sortType = SortType.POPULAR;
    })
    .addCase(setActiveCard, (state, action) => {
      state.activeCardId = action.payload;
    })
    .addCase(resetActiveCard, (state) => {
      state.activeCardId = EMPTY_ACTIVE_CARD;
    });
});

export { data };

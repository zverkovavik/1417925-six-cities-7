import { createReducer } from '@reduxjs/toolkit';
import { adaptToClient, adaptToClientCardsArray, adaptToClientReviewsArray } from '../../utils/adapter';
import { filterCardsByCurrentCity } from '../../routes/main-page/selectors';
import { changeCity, loadAdCards, loadReviews, loadOneCard, loadFavoriteList, loadApartmentsNear, postComment, changeFavoriteList, setSortType, resetSortType } from '../action';
import { getSortData } from '../../utils/utils';
import { City, SortType } from '../../constants';

const initialState = {
  city: City.PARIS,
  cards: [],
  adsList: [],
  isDataLoaded: false,
  activeCard: null,
  favoriteList: [],
  apartmentsNear: [],
  reviews: [],
  sortType: SortType.POPULAR,
};

const appData = createReducer(initialState, (builder) => {
  builder
    .addCase(loadAdCards, (state, action) => {
      state.cards = adaptToClientCardsArray(action.payload);
      state.adsList = filterCardsByCurrentCity(adaptToClientCardsArray(action.payload), state.city);
      state.isDataLoaded = true;
    })
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
      state.sortType = SortType.POPULAR;
      state.adsList = filterCardsByCurrentCity(state.cards, action.payload);
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
    .addCase(changeFavoriteList, (state, action) => {
      // не реализован
    })
    .addCase(loadReviews, (state, action) => {
      state.reviews = adaptToClientReviewsArray(action.payload);
    })
    .addCase(postComment, (state, action) => {
      state.reviews = adaptToClientReviewsArray(action.payload);
    })
    .addCase(setSortType, (state, action) => {
      state.adsList = getSortData(filterCardsByCurrentCity(state.cards, state.city), state.sortType, action.payload);
      state.sortType = action.payload;
    })
    .addCase(resetSortType, (state) => {
      state.sortType = SortType.POPULAR;
    });
});

export { appData };

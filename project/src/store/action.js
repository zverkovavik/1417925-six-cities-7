
import { createAction } from '@reduxjs/toolkit';

export const ActionType = {
  CHANGE_CITY: 'data/change-city',
  LOAD_AD_CARDS: 'data/load-ad-cards',
  LOAD_ONE_CARD: 'data/load-one-card',
  LOAD_APARTMENTS_NEAR: 'data/load-apartments-near',
  LOAD_FAVORITE_LIST: 'data/load-favorite-list',
  UPDATE_FAVORITE_LIST: 'data/update-favorite-list',
  LOAD_REVIEWS: 'data/load-reviews',
  SET_EMAIL: 'user/set-email',
  SET_AVATAR_URL: 'user/set-avatar-url',
  REQUIRED_AUTHORIZATION: 'user/required-authorization',
  LOGOUT: 'user/log-out',
  REDIRECT_TO_ROUTE: 'redirect-to-route',
  SET_ACTIVE_CARD: 'data/set-active-card',
  RESET_ACTIVE_CARD: 'data/reset-active-card',
  SET_SORT_TYPE: 'data/set-sort-type',
  RESET_SORT_TYPE: 'data/reset-sort-type',
};

export const changeCity = createAction(ActionType.CHANGE_CITY, (currentCity) => ({
  payload: currentCity,
}));

export const loadAdCards = createAction(ActionType.LOAD_AD_CARDS, (cards) => ({
  payload: cards,
}));

export const loadOneCard = createAction(ActionType.LOAD_ONE_CARD, (card) => ({
  payload: card,
}));

export const loadApartmentsNear = createAction(ActionType.LOAD_APARTMENTS_NEAR, (apartments) => ({
  payload: apartments,
}));

export const loadFavoriteList = createAction(ActionType.LOAD_FAVORITE_LIST, (list) => ({
  payload: list,
}));

export const updateFavoriteList = createAction(ActionType.UPDATE_FAVORITE_LIST, (changedCard) => ({
  payload: changedCard,
}));

export const loadReviews = createAction(ActionType.LOAD_REVIEWS, (reviews) => ({
  payload: reviews,
}));

export const setEmail = createAction(ActionType.SET_EMAIL, (email) => ({
  payload: email,
}));

export const setAvatarUrl = createAction(ActionType.SET_AVATAR_URL, (url) => ({
  payload: url,
}));

export const requireAuthorization = createAction(ActionType.REQUIRED_AUTHORIZATION, (status) => ({
  payload: status,
}));

export const logoutApp = createAction(ActionType.LOGOUT);

export const redirectToRoute = createAction(ActionType.REDIRECT_TO_ROUTE, (url) => ({
  payload: url,
}));

export const setActiveCard = createAction(ActionType.SET_ACTIVE_CARD, (cardId) => ({
  payload: cardId,
}));

export const resetActiveCard = createAction(ActionType.RESET_ACTIVE_CARD);

export const setSortType = createAction(ActionType.SET_SORT_TYPE, (sortType) => ({
  payload: sortType,
}));

export const resetSortType = createAction(ActionType.RESET_SORT_TYPE);


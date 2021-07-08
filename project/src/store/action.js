export const ActionType = {
  LOAD_AD_CARDS: 'load-ad-cards',
  LOAD_ONE_CARD: 'load-one-card',
  LOAD_APARTMENTS_NEAR: 'load-apartments-near',
  LOAD_FAVORITE_LIST: 'load-favorite-list',
  CHANGE_FAVORITE_LIST: 'change-favorite-list',
  LOAD_REVIEWS: 'load-reviews',
  POST_COMMENT: 'post-comment',
  REQUIRED_AUTHORIZATION: 'required-authorization',
  LOGOUT: 'log-out',
  SET_EMAIL: 'set-email',
  REDIRECT_TO_ROUTE: 'redirect-to-route',
  CHANGE_CITY: 'change-city',
  SET_ACTIVE_CARD: 'set-active-card',
  RESET_ACTIVE_CARD: 'reset-active-card',
  SHOW_SORT_MENU: 'show-sort-menu',
  RESET_SORT_MENU: 'reset-sort-menu',
  SET_SORT_TYPE: 'set-sort-type',
};

export const ActionCreator = {
  changeCity: (currentCity) => ({
    type: ActionType.CHANGE_CITY,
    payload: currentCity,
  }),
  loadAdCards: (data) => ({
    type: ActionType.LOAD_AD_CARDS,
    payload: data,
  }),
  loadOneCard: (card) => ({
    type: ActionType.LOAD_ONE_CARD,
    payload: card,
  }),
  loadApartmentsNear: (data) => ({
    type: ActionType.LOAD_APARTMENTS_NEAR,
    payload: data,
  }),
  loadFavoriteList: (data) => ({
    type: ActionType.LOAD_FAVORITE_LIST,
    payload: data,
  }),
  changeFavoriteList: (data) => ({
    type: ActionType.CHANGE_FAVORITE_LIST,
    payload: data,
  }),
  loadReviews: (data) => ({
    type: ActionType.LOAD_REVIEWS,
    payload: data,
  }),
  postComment: (data) => ({
    type: ActionType.POST_COMMENT,
    payload: data,
  }),
  requireAuthorization: (status) => ({
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: status,
  }),
  setEmail: (email) => ({
    type: ActionType.SET_EMAIL,
    payload: email,
  }),
  redirectToRoute: (url) => ({
    type: ActionType.REDIRECT_TO_ROUTE,
    payload: url,
  }),
  logout: () => ({
    type: ActionType.LOGOUT,
  }),
  setActiveCard: (cardId) => ({
    type: ActionType.SET_ACTIVE_CARD,
    payload: cardId,
  }),
  resetActiveCard: () => ({
    type: ActionType.RESET_ACTIVE_CARD,
  }),
  showSortMenu: () => ({
    type: ActionType.SHOW_SORT_MENU,
  }),
  reserSortMenu: () => ({
    type: ActionType.RESET_SORT_MENU,
  }),
  setSortType: (sortType) => ({
    type: ActionType.SET_SORT_TYPE,
    payload: sortType,
  }),
};

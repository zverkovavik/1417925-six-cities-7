export const ActionType = {
  CHANGE_CITY: 'change-city',
  LOAD_AD_CARDS: 'load-ad-cards',
  REQUIRED_AUTHORIZATION: 'required-authorization',
  SET_EMAIL: 'set-email',
  REDIRECT_TO_ROUTE: 'redirect-to-route',
  LOGOUT: 'log-out',
  SET_ACTIVE_CARD: 'set-active-card',
  RESET_ACTIVE_CARD: 'reset-active-card',
  LOAD_REVIEWS: 'load-reviews',
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
    payload: 0,
  }),
  loadReviews: (data) => ({
    type: ActionType.LOAD_REVIEWS,
    payload: data,
  }),
};

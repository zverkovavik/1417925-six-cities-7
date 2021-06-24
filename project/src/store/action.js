export const ActionType = {
  CHANGE_CITY: 'change-city',
  LOAD_AD_CARDS: 'load-ad-cards',
  REQUIRED_AUTHORIZATION: 'required-authorization',
  LOGOUT: 'log-out',
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
  logout: () => ({
    type: ActionType.LOGOUT,
  }),
};

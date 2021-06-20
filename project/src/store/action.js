export const ActionType = {
  CHANGE_CITY: 'change-city',
};

export const ActionCreator = {
  changeCity: (currentCity) => ({
    type: ActionType.CHANGE_CITY,
    payload: currentCity,
  }),
};

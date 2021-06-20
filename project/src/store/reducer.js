import { ActionType } from './action';
import { Cities } from '../constants';
import { Cards } from '../mocks/offers';

const filterCardsByCurrentCity = (city) => Cards.filter((card) => city === card.city.city);

const initialState = {
  city: Cities.PARIS,
  adsList: filterCardsByCurrentCity(Cities.PARIS),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return {
        ...state,
        city: action.payload,
        adsList: filterCardsByCurrentCity(action.payload),
      };
    default:
      return state;
  }
};

export { reducer };

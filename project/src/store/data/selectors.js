import { NameSpace } from '../root-reducer';
import { createSelector } from 'reselect';
import { SortType } from '../../constants';
import { sortByRating, sortHighToLowPrice, sortLowToHighPrice } from '../../utils/utils';

export const getCity = (state) =>  state[NameSpace.DATA].city;

export const getCards = (state) =>  state[NameSpace.DATA].cards;

export const getActiveCard = (state) =>  state[NameSpace.DATA].activeCard;

export const getFavoriteList = (state) =>  state[NameSpace.DATA].favoriteList;

export const getApartmentsNear = (state) =>  state[NameSpace.DATA].apartmentsNear;

export const getReviews = (state) =>  state[NameSpace.DATA].reviews;

export const getLoadedDataStatus = (state) => state[NameSpace.DATA].isDataLoaded;

export const getSortType = (state) =>  state[NameSpace.DATA].sortType;

export const updateCards = (cards, updatedCard) => {
  const index = cards.findIndex((item) => item.id === updatedCard.id);
  if (index === -1) {
    return cards;
  }
  const updatedCards = [
    ...cards.slice(0, index),
    updatedCard,
    ...cards.slice(index + 1),
  ];

  return updatedCards;
};

export const getActiveCardId = (state) =>  state[NameSpace.DATA].activeCardId;

export const filterCardsByCurrentCity = createSelector(
  [getCards, getCity],(cards, city) => cards.filter((card) => city === card.city.name),
);

export const getSortData = createSelector(
  [filterCardsByCurrentCity, getSortType],
  (currentList, activeSortType) => {
    const currentAdsList = currentList.slice();

    switch (activeSortType) {
      case SortType.HIGH_TO_LOW:
        return sortHighToLowPrice(currentAdsList);
      case SortType.LOW_TO_HIGH:
        return sortLowToHighPrice(currentAdsList);
      case SortType.TOP_RATED_FIRST:
        return sortByRating(currentAdsList);
      default:
        return currentAdsList;
    }
  },
);

export const getFavoriteSet = createSelector(
  [getFavoriteList],(favoriteList) => [...new Set(favoriteList.map((city) => city.city.name))],
);

export const getFavorites = createSelector(
  [getFavoriteList, getFavoriteSet],(favoriteList, favoriteSet) => {
    const result = [];
    favoriteSet.forEach((city) => {
      result.push({
        name: `${city}`,
        cards: favoriteList.filter((element) => element.city.name === city),
      });
    });
    return result;
  },
);


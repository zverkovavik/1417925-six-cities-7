import { NameSpace } from '../root-reducer';

export const getCity = (state) =>  state[NameSpace.DATA].city;

export const getCards = (state) =>  state[NameSpace.DATA].cards;

export const getAdsList = (state) =>  state[NameSpace.DATA].adsList;

export const getActiveCard = (state) =>  state[NameSpace.DATA].activeCard;

export const getFavoriteList = (state) =>  state[NameSpace.DATA].favoriteList;

export const getApartmentsNear = (state) =>  state[NameSpace.DATA].apartmentsNear;

export const getReviews = (state) =>  state[NameSpace.DATA].reviews;

export const getLoadedDataStatus = (state) => state[NameSpace.DATA].isDataLoaded;

export const getSortType = (state) =>  state[NameSpace.DATA].sortType;

export const filterCardsByCurrentCity = (cards, city) => cards.filter((card) => city === card.city.name);

export const updateCards = (cards, updatedCard) => {
  const index = cards.findIndex((item) => item.id === updatedCard.id);

  const updatedCards = [
    ...cards.slice(0, index),
    updatedCard,
    ...cards.slice(index + 1),
  ];

  return updatedCards;
};

export const getActiveCardId = (state) =>  state[NameSpace.DATA].activeCardId;
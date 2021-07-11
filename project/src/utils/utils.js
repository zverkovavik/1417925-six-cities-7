import { AuthorizationStatus, SortType } from '../constants';
import dayjs from 'dayjs';

const REVIEW_COUNT = 10;
export const isCheckedAuth = (authorizationStatus) => authorizationStatus === AuthorizationStatus.UNKNOWN;

export const getCardWithTheSameId = (array, id) => array.filter((element) => element.id === id);

export const sortByDate = (array) => array.sort((commentA, commentB) => (new Date(commentB.date) - new Date(commentA.date)));

const sortHighToLowPrice = (array) => array.sort((adA, adB) => adB.price - adA.price);
const sortLowToHighPrice = (array) => array.sort((adA, adB) => adA.price - adB.price);
const sortByRating = (array) => array.sort((adA, adB) => adB.rating - adA.rating);

export const checkReviews = (array) => {
  let sortedReviews = array;
  if (array) {
    sortedReviews = sortByDate(array);
    if (sortedReviews.length > 10) {
      sortedReviews = sortedReviews.slice(0, REVIEW_COUNT);
    }
  }
  return sortedReviews;
};

export const getDate = (date) => dayjs(date).format('MMMM YYYY');

export const setSortType = (currentList, currentSortType, activeSortType) => {
  const currentAdsList = currentList.slice();
  if (currentSortType === activeSortType) {
    return currentAdsList;
  }

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
};

import { AuthorizationStatus, SortType } from '../constants';
import dayjs from 'dayjs';

const REVIEW_COUNT = 10;
const FIRST_LETTER_INDEX = 0;
const SECOND_LETTER_INDEX = 1;
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

export const getSortData = (currentList, currentSortType, activeSortType) => {
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

export const calculateRating = (rating) => Math.round(rating) * 20;

export const capitalizeFirstLetter = (string) => string[FIRST_LETTER_INDEX].toUpperCase() + string.slice(SECOND_LETTER_INDEX);

import { AuthorizationStatus } from './constants';
import dayjs from 'dayjs';
const REVIEW_COUNT = 10;
export const isCheckedAuth = (authorizationStatus) => authorizationStatus === AuthorizationStatus.UNKNOWN;

export const adaptToClient = (cards) => {
  const adaptedCards = cards.map((card) => {
    const adaptedAdCard = Object.assign(
      {},
      card,
      {
        host: {
          avatarUrl: card.host.avatar_url,
          isPro: card.host.is_pro,
          userName: card.host.name,
        },
        isFavorite: card.is_favorite,
        isPremium: card.is_premium,
        maxAdults: card.max_adults,
        previewImage: card.preview_image,
      },
    );
    delete adaptedAdCard.is_favorite;
    delete adaptedAdCard.is_premium;
    delete adaptedAdCard.max_adults;
    delete adaptedAdCard.preview_image;
    return adaptedAdCard;
  });
  return adaptedCards;
};

export const getCardWithTheSameId = (array, id) => array.filter((element) => element.id === id);

export const sortByDate = (array) => array.sort((commentA, commentB) => (new Date(commentB.date) - new Date(commentA.date)));

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

export const filterCardsByCurrentCity = (cards, city) => cards.filter((card) => city === card.city.name);

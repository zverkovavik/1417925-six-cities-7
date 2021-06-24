import { AuthorizationStatus } from './constants';

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
    return adaptedAdCard;
  });
  return adaptedCards;
};

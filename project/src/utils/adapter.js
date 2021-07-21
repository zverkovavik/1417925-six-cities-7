export const adaptToClient = (card) => {
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
};

export const adaptToClientCardsArray = (cards) =>  cards.map((card) => adaptToClient(card));

export const adaptToClientReviewsArray = (reviews) => {
  const adaptedReviews = reviews.map((review) => {
    const adaptedReview = Object.assign(
      {},
      review,
      {
        user: {
          avatarUrl: review.user.avatar_url,
          isPro: review.user.is_pro,
          authorName: review.user.name,
          id: review.user.id,
        },
      },
    );
    return adaptedReview;
  });
  return adaptedReviews;
};

export const adaptToClientData = (data) => {
  const adaptedData = Object.assign(
    {},
    data,
    {
      avatarUrl: data.avatar_url,
    });
  delete adaptedData.avatar_url;
  return adaptedData;
};

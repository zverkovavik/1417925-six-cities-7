import React from 'react';
import PropTypes from 'prop-types';

function Card(props) {
  const {isPremium, imgUrl, price, isBookmark, rating, title, type } = props;
  return (
    <article className="cities__place-card place-card">
      {isPremium ? <div className="place-card__mark"><span>Premium</span></div> : '' }
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="/">
          <img className="place-card__image" src={imgUrl} width={260} height={200} alt="Place" />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <button className={isBookmark ? 'place-card__bookmark-button place-card__bookmark-button--active button' : 'place-card__bookmark-button  button'} type="button">
            <svg className="place-card__bookmark-icon" width={18} height={19}>
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${rating}%`}}/>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="/">{title}</a>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default Card;

Card.propTypes = {
  isPremium: PropTypes.bool.isRequired,
  imgUrl: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  isBookmark: PropTypes.bool.isRequired,
  rating: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

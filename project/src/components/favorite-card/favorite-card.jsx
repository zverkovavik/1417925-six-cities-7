import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { calculateRating } from '../../utils/utils';
import { getActiveCardId } from '../../store/data/selectors';
import { setActiveCard, resetActiveCard } from '../../store/action';
import { changeFavoriteList } from '../../store/api-actions';
import { Status } from '../../constants';

function FavoriteCard(props) {
  const { id, price, previewImage, title, type, rating } = props;
  const activeCardId = useSelector(getActiveCardId);

  const dispatch = useDispatch();

  const onCardMouseOver = (cardId) => {
    dispatch(setActiveCard(cardId));
  };

  const onCardMouseOut = () => {
    dispatch(resetActiveCard());
  };

  const onFavoriteButtonClick = () => {
    dispatch(changeFavoriteList(id, Status.UNFAVORITE));
  };

  return (
    <article onMouseOver={() => onCardMouseOver(id)} onMouseOut={onCardMouseOut} className="favorites__card place-card">
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <Link to={`/offer/${activeCardId}`}>
          <img className="place-card__image" src={previewImage} width="150" height="110" alt="Place" />
        </Link>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button onClick={onFavoriteButtonClick} className="place-card__bookmark-button place-card__bookmark-button--active button" type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${calculateRating(rating)}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${activeCardId}`} href="/">{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

FavoriteCard.propTypes = {
  id: PropTypes.number.isRequired,
  previewImage: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default FavoriteCard;

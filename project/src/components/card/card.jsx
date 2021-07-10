import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ActionCreator } from '../../store/action';

function Card(props) {

  const { id, isPremium, previewImage, price, isFavorite, rating, title, type, activeCardId, onCardMouseOver, onCardMouseOut } = props;

  return (
    <article onMouseOver={() => onCardMouseOver(id)} onMouseOut={() => onCardMouseOut()} className="cities__place-card place-card">
      {isPremium ? <div className="place-card__mark"><span>Premium</span></div> : '' }
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`/offer/${activeCardId}`}>
          <img className="place-card__image" src={previewImage} width={260} height={200} alt="Place" />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <button className={isFavorite ? 'place-card__bookmark-button place-card__bookmark-button--active button' : 'place-card__bookmark-button  button'} type="button">
            <svg className="place-card__bookmark-icon" width={18} height={19}>
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${rating * 20}%`}}/>
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

Card.propTypes = {
  id: PropTypes.number.isRequired,
  isPremium: PropTypes.bool.isRequired,
  previewImage: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  rating: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  activeCardId: PropTypes.number.isRequired,
  onCardMouseOver: PropTypes.func.isRequired,
  onCardMouseOut: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  activeCardId: state.activeCardId,
});

const mapDispatchToProps = (dispatch) => ({
  onCardMouseOver(cardId) {
    dispatch(ActionCreator.setActiveCard(cardId));
  },
  onCardMouseOut() {
    dispatch(ActionCreator.resetActiveCard());
  },
});

export {Card};
export default connect(mapStateToProps, mapDispatchToProps)(Card);

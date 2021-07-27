import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveCard, resetActiveCard, redirectToRoute } from '../../store/action';
import { getActiveCardId } from '../../store/data/selectors';
import { changeFavoriteList } from '../../store/api-actions';
import { getAuthorizationStatus } from '../../store/user/selectors';
import { AuthorizationStatus, AppRoute, Status, Toast } from '../../constants';
import { calculateRating, capitalizeFirstLetter } from '../../utils/utils';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import offerProp from '../../prop-types/offer-prop';

function Card(props) {

  const { id, isPremium, previewImage, price, isFavorite, rating, title, type } = props;
  const activeCardId = useSelector(getActiveCardId);
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const dispatch = useDispatch();

  const handleCardMouseOver = (cardId) => {
    dispatch(setActiveCard(cardId));
  };

  const handleCardMouseOut = () => {
    dispatch(resetActiveCard());
  };

  const handleFavoriteButtonClick = () => {
    if (authorizationStatus === AuthorizationStatus.AUTH) {
      const status = isFavorite ? Status.UNFAVORITE : Status.FAVORITE;
      dispatch(changeFavoriteList(id, status))
        .catch(() => {
          toast.error(Toast.USUAL_ERROR_MESSAGE, {
            position: Toast.POSITION,
            autoClose: Toast.AUTO_CLOSE_TIME,
          });
        });
    } else {
      dispatch(redirectToRoute(AppRoute.LOGIN));
    }
  };

  return (
    <article onMouseOver={() => handleCardMouseOver(id)} onMouseOut={handleCardMouseOut} className="cities__place-card place-card">
      {isPremium && (<div className="place-card__mark"><span>Premium</span></div>)}
      <ToastContainer />
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
          <button className={isFavorite ? 'place-card__bookmark-button place-card__bookmark-button--active button' : 'place-card__bookmark-button  button'} onClick={handleFavoriteButtonClick} type="button">
            <svg className="place-card__bookmark-icon" width={18} height={19}>
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${calculateRating(rating)}%`}}/>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${activeCardId}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{capitalizeFirstLetter(type)}</p>
      </div>
    </article>
  );
}

Card.propTypes = offerProp;

export default Card;

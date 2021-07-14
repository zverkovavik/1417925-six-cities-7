import React, { useEffect }  from 'react';
import { useParams } from 'react-router-dom';
import { CardInRoom }from '../../components/card-for-room-component/card-for-room-component';
import Review from '../../components/review/review';
import NewCommentForm from '../../components/new-comment-form/new-comment-form';
import cardInDetailsProp from '../../prop-types/offer-in-details-prop';
import reviewsProp from '../../prop-types/reviews-prop';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Header } from '../../components/header/header';
import Map from '../../components/map/map';
import { checkReviews, getDate } from '../../utils/utils';
import { initRoom } from './action/init-room';
import LoadingScreen from '../../components/loading-screen/loading-screen';
import { AuthorizationStatus } from '../../constants';
import { ActionCreator } from '../../store/action';

const MAX_IMAGE_COUNT = 6;
function Room(props) {

  const { activeCard, apartmentsNear, authorizationStatus, reviews, init, setActiveCardId } = props;
  const { id } = useParams();

  useEffect(() => {
    init(id);
    setActiveCardId(Number(id));
  }, [id]);

  if (activeCard === null || reviews === null) {
    return (
      <LoadingScreen />
    );
  }

  const sortedReviews = checkReviews(reviews);
  const { isPremium, images, price, isFavorite, rating, title, type, bedrooms, description, goods, maxAdults, host: { avatarUrl, isPro, userName }} = activeCard;

  return (
    <div className="page">
      <Header authorizationStatus={authorizationStatus} />
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {images.slice(0, MAX_IMAGE_COUNT).map((image) => (
                <div key ={image} className="property__image-wrapper">
                  <img className="property__image" src={image} alt={image} />
                </div>))}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {isPremium ? <div className="property__mark"><span>Premium</span></div> : ''}
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {title}
                </h1>
                <button className={isFavorite ? 'property__bookmark-button property__bookmark-button--active button' : 'property__bookmark-button button'} type="button">
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: `${rating * 20}%` }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {bedrooms === 1 ? '1 bedroom' : `${bedrooms} bedrooms`}
                </li>
                <li className="property__feature property__feature--adults">
                  Max {maxAdults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {goods.map((item) => (<li key={item} className="property__inside-item">{item}</li>))}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="property__avatar user__avatar" src={avatarUrl} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="property__user-name">
                    {userName}
                  </span>
                  {isPro ? <span className="property__user-status">Pro</span> : ''}
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {description}
                  </p>
                </div>
              </div>
              <section className="property__reviews reviews">
                {reviews ?
                  <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{sortedReviews.length}</span></h2>
                  :
                  <h2 className="reviews__title">No reviews yet</h2>}

                <ul className="reviews__list">
                  {sortedReviews.length ? sortedReviews.map((review) => (
                    <Review
                      comment = {review.comment}
                      date = {getDate(review.date)}
                      rating = {review.rating}
                      avatarUrl = {review.user.avatarUrl}
                      authorName = {review.user.authorName}
                      key = {review.comment + review.id}
                    />
                  )) : ''}
                </ul>
                { authorizationStatus === AuthorizationStatus.AUTH ? <NewCommentForm /> : ''}
              </section>
            </div>
          </div>
          <section className="property__map map" style={{ marginLeft: 'auto', marginRight: 'auto', width: '90%' }}>
            <Map activeCardId={id} adsList={apartmentsNear} />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {!apartmentsNear.length ? '' : apartmentsNear.map((card) => (
                <CardInRoom
                  id = {card.id}
                  isPremium = {card.isPremium}
                  previewImage = {card.previewImage}
                  price = {card.price}
                  isFavorite = {card.isFavorite}
                  rating = {card.rating}
                  title = {card.title}
                  type = {card.type}
                  key = {card.title + card.id}
                />),
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

Room.propTypes = {
  init: PropTypes.func.isRequired,
  setActiveCardId: PropTypes.func.isRequired,
  reviews: reviewsProp,
  authorizationStatus: PropTypes.string.isRequired,
  activeCard: cardInDetailsProp,
  apartmentsNear: PropTypes.arrayOf(
    cardInDetailsProp,
  ),
};

const mapStateToProps = (state) => ({
  activeCard: state.activeCard,
  apartmentsNear: state.apartmentsNear,
  reviews: state.reviews,
  authorizationStatus: state.authorizationStatus,
});

const mapDispatchToProps = (dispatch) =>({
  init: (id) => dispatch(initRoom(id)),
  setActiveCardId: (id) =>
    dispatch(ActionCreator.setActiveCard(id)),
});

export { Room };
export default connect(mapStateToProps, mapDispatchToProps)(Room);

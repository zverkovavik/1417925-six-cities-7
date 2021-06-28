import React from 'react';
import Card from '../components/card';
import Logo from '../components/logo';
import Review from '../components/review';
import NewCommentForm from '../components/form-to-submit-comment';
import cardInDetailsProp from '../mocks/offer-in-details-prop';
import reviewsProp from '../mocks/reviews-prop';
import PropTypes from 'prop-types';

const CARD_COUNT = 3;
function Room(props) {

  const { cards, reviews } = props;
  const {isPremium, images, price, isFavorite, rating, title, type, bedrooms, description,goods, maxAdults, host: { avatarUrl, id, isPro, userName } } = cards[cards.length - 1];
  const apartmentsNear = cards.slice();
  apartmentsNear.length = CARD_COUNT;

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo />
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="/">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="/">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {images.map((image) => (
                <div key ={image} className="property__image-wrapper">
                  <img className="property__image" src={image} alt={image} />
                </div>))};
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
              <div id={id} className="property__host">
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
              {/* <section className="property__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
                <ul className="reviews__list">
                  {reviews.map((review) => (
                    <Review
                      comment = {review.comment}
                      date = { review.date}
                      ratingInReview = {review.ratingInReview}
                      avatarUrl = {review.user.avatarUrl}
                      authorName = {review.user.authorName}
                      key = {review.comment}
                    />
                  ))}
                </ul>
                <NewCommentForm />
              </section> */}
            </div>
          </div>
          <section className="property__map map"></section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {apartmentsNear.map((card) => (
                <Card
                  id = {card.id}
                  isPremium = {card.isPremium}
                  previewImage = {card.previewImage}
                  price = {card.price}
                  isFavorite = {card.isFavorite}
                  rating = {card.rating}
                  title = {card.title}
                  type = {card.type}
                  key = {card.title}
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
  cards: PropTypes.arrayOf(
    cardInDetailsProp,
  ),
  reviews: reviewsProp,
};

export default Room;

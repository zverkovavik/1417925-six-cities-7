import React from 'react';
import PropTypes from 'prop-types';

function Review(props) {

  const { comment, date, ratingInReview, avatarUrl, authorName } = props;
  return (
    <ul className="reviews__list">
      <li className="reviews__item">
        <div className="reviews__user user">
          <div className="reviews__avatar-wrapper user__avatar-wrapper">
            <img className="reviews__avatar user__avatar" src={avatarUrl} width="54" height="54" alt="Reviews avatar" />
          </div>
          <span className="reviews__user-name">
            {authorName}
          </span>
        </div>
        <div className="reviews__info">
          <div className="reviews__rating rating">
            <div className="reviews__stars rating__stars">
              <span style={{width: `${ratingInReview * 20}%`}}></span>
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <p className="reviews__text">
            {comment}
          </p>
          <time className="reviews__time" dateTime={date}>{date}</time>
        </div>
      </li>
    </ul>

  );
}

Review.propTypes = {
  comment: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  ratingInReview: PropTypes.number.isRequired,
  avatarUrl: PropTypes.string.isRequired,
  authorName: PropTypes.string.isRequired,

};

export default Review;

import React, { useState } from 'react';
import { ratingForm } from '../../constants';

const createRatingForm = (numberValue, definition) => (
  <React.Fragment key={definition}>
    <input className="form__rating-input visually-hidden" name="rating" value={numberValue} id={`${numberValue}-stars`} type="radio" />
    <label htmlFor={`${numberValue}-stars`} className="reviews__rating-label form__rating-label" title={definition}>
      <svg className="form__star-image" width="37" height="33">
        <use xlinkHref="#icon-star"></use>
      </svg>
    </label>
  </React.Fragment>);

function NewCommentForm(props) {

  const [newComment, setValue] = useState({ comment: null, rating: null });

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div  onClick={(evt) => setValue({ ...newComment, rating: evt.target.value})} className="reviews__rating-form form__rating" >
        {ratingForm.map((ratingFormElement) => createRatingForm(ratingFormElement.numberValue, ratingFormElement.definition))}
      </div>
      <textarea onChange={(evt) => setValue({ ...newComment, comment: evt.target.value})} className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved"></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
                      To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button onSubmit={(evt) => evt.preventDefault()} className="reviews__submit form__submit button" type="submit" disabled="">Submit</button>
      </div>
    </form>
  );
}

export default NewCommentForm;

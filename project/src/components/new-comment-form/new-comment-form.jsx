import React, { useState, useRef } from 'react';
import { ratingForm } from '../../constants';
import { postComment } from '../../store/api-actions';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ActionCreator } from '../../store/action';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MIN_COMMENT_LENGTH = 50;
const MAX_COMMENT_LENGTH = 300;

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

  const { id } = useParams();
  const defaultValue = { comment: '', rating: null };
  const [newComment, setValue] = useState(defaultValue);
  const formRef = useRef();
  const dispatch = useDispatch();

  let isFormChecked =
    newComment.rating !== null &&
    newComment.comment.length >= MIN_COMMENT_LENGTH &&
    newComment.comment.length <= MAX_COMMENT_LENGTH;

  let isSubmitting = false;

  const onFormSubmit = (evt) => {
    evt.preventDefault();
    isFormChecked = false;
    isSubmitting = true;

    dispatch(postComment(id, newComment))
      .then(({data}) => {
        dispatch(ActionCreator.loadReviews(data));
        isSubmitting = false;
        setValue(defaultValue);
        isFormChecked = true;
        formRef.current.reset();
      })
      .catch(() => {
        isSubmitting = false;
        isFormChecked = true;
        toast.error('Sorry, your comment was not sent. Please, try again later.', {
          position: 'top-center',
          autoClose: 5000,
        });

      });
  };

  return (
    <form ref={formRef} onSubmit={onFormSubmit} className="reviews__form form" action="#" method="post" disabled={isSubmitting}>
      <ToastContainer />
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div  onClick={(evt) => setValue({ ...newComment, rating: evt.target.value})} className="reviews__rating-form form__rating" >
        {ratingForm.map((ratingFormElement) => createRatingForm(ratingFormElement.numberValue, ratingFormElement.definition))}
      </div>
      <textarea minLength={MIN_COMMENT_LENGTH} maxLength={MAX_COMMENT_LENGTH} onChange={(evt) => setValue({ ...newComment, comment: evt.target.value})} className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved" required></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
                      To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={!isFormChecked}>Submit</button>
      </div>
    </form>
  );
}

export default NewCommentForm;

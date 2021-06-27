import PropTypes from 'prop-types';

export default PropTypes.arrayOf(
  PropTypes.shape({
    comment: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    ratingInReview: PropTypes.number.isRequired,
    user: PropTypes.shape({
      avatarUrl: PropTypes.string.isRequired,
      authorName: PropTypes.string.isRequired,
    }),
  }),
);

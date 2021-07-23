import PropTypes from 'prop-types';

export default PropTypes.shape({
  id: PropTypes.number.isRequired,
  isPremium: PropTypes.bool.isRequired,
  previewImage: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  rating: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
}).isRequired;

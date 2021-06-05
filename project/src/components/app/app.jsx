import React from 'react';
import MainPage from '../main-page/main-page';
import PropTypes from 'prop-types';


function App(props) {
  const {cards} = props;
  return <MainPage cards={cards} />;
}

App.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      isPremium: PropTypes.bool.isRequired,
      imgUrl: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      isBookmark: PropTypes.bool.isRequired,
      rating: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default App;

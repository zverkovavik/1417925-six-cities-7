import React from 'react';
import SortTypeMenu from './sort-menu';
import Card from '../components/card';
import { connect } from 'react-redux';
import cardsProp from '../prop-types/offers-prop';
import PropTypes from 'prop-types';
function OffersList(props) {

  const { city, adsList, sortTypeName } = props;
  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">{adsList.length} places to stay in {city}</b>
      <SortTypeMenu sortTypeName={sortTypeName} />
      <div className="cities__places-list places__list tabs__content">
        { adsList.map((card) => (
          <Card
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
  );
}

OffersList.propTypes =  {
  city: PropTypes.string.isRequired,
  adsList: cardsProp,
  sortTypeName: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  sortType: state.SortType,
  city: state.city,
  sortTypeName: state.sortTypeName,
  adsList: state.adsList,
});

export { OffersList };
export default connect(mapStateToProps, null)(OffersList);

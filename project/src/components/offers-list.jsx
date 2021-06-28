import React from 'react';
import Card from '../components/card';
import { connect } from 'react-redux';
import cardsProp from '../mocks/offers-prop';
import PropTypes from 'prop-types';
function OffersList(props) {

  const { city, adsList } = props;
  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">{adsList.length} places to stay in {city}</b>
      <form className="places__sorting" action="#" method="get">
        <span className="places__sorting-caption">Sort by</span>
        <span className="places__sorting-type" tabIndex={0}>
                      Popular
          <svg className="places__sorting-arrow" width={7} height={4}>
            <use xlinkHref="#icon-arrow-select" />
          </svg>
        </span>
        <ul className="places__options places__options--custom places__options--opened">
          <li className="places__option places__option--active" tabIndex={0}>Popular</li>
          <li className="places__option" tabIndex={0}>Price: low to high</li>
          <li className="places__option" tabIndex={0}>Price: high to low</li>
          <li className="places__option" tabIndex={0}>Top rated first</li>
        </ul>
      </form>
      <div className="cities__places-list places__list tabs__content">
        {adsList.map((card) => (
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
  adsList: cardsProp,
  city: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  city: state.city,
  adsList: state.adsList,
});

export {OffersList};
export default connect(mapStateToProps, null)(OffersList);

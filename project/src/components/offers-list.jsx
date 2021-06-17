import React, { useState } from 'react';
import Card from '../components/card';
import cardsProp from '../mocks/offers-prop';
function OffersList(props) {
  const [ activeCard, setActiveCard ] = useState(null);
  const {cards} = props;
  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">312 places to stay in Amsterdam</b>
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
      <div onMouseMove={(evt) => { setActiveCard(evt.target.id); return activeCard; }} className="cities__places-list places__list tabs__content">
        {cards.map((card) => (
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
  );
}

OffersList.propTypes =  {
  cards: cardsProp,
};
export default OffersList;

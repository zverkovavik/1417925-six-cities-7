import React from 'react';
import SortTypeMenu from '../sort-type-menu/sort-type-menu';
import Card from '../card/card';
import {  useSelector } from 'react-redux';
import { getAdsList, getCity, getSortType } from '../../store/data/selectors';

function OffersList() {

  const city = useSelector(getCity);
  const adsList = useSelector(getAdsList);
  const sortType = useSelector(getSortType);

  return (
    <section className="cities__places places" data-testid="offers-list">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">{adsList.length} places to stay in {city}</b>
      <SortTypeMenu sortType={sortType} />
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

export default React.memo(OffersList);

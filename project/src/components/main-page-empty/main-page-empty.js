import React from 'react';
import { useSelector } from 'react-redux';
import { getCity } from '../../store/data/selectors';

function MainPageEmpty() {
  const city = useSelector(getCity);

  return (
    <section className="cities__no-places" data-testid="main-page-empty">
      <div className="cities__status-wrapper tabs__content">
        <b className="cities__status">No places to stay available</b>
        <p className="cities__status-description">We could not find any property available at the moment in {city}</p>
      </div>
    </section>
  );
}

export default MainPageEmpty;

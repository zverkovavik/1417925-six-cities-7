import React from 'react';
import { City } from '../../constants';
import { Link } from 'react-router-dom';
import { changeCity, setSortType } from '../../store/action';
import { useDispatch, useSelector } from 'react-redux';
import { getCity, getSortType } from '../../store/data/selectors';

function CitiesList() {

  const city = useSelector(getCity);
  const sortType = useSelector(getSortType);
  const dispatch = useDispatch();
  const handleCityClick = (chosenCity) => {
    dispatch(changeCity(chosenCity));
    dispatch(setSortType(sortType));
  };

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list" data-testid="cities-list">
        {Object.values(City).map((element) => (
          <li className="locations__item" key={element}>
            <Link to="/" onClick={() => handleCityClick(element)} className={element === city ? 'locations__item-link tabs__item tabs__item--active' : 'locations__item-link tabs__item'}>
              <span>{element}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default React.memo(CitiesList);

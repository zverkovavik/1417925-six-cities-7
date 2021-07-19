import React from 'react';
import { City } from '../../constants';
import { changeCity } from '../../store/action';
import { useDispatch, useSelector } from 'react-redux';
import { getCity } from '../../store/data/selectors';
import { resetSortType } from '../../store/action';

function CitiesList(props) {

  const city = useSelector(getCity);
  const dispatch = useDispatch();
  const onCityClick = (chosenCity) => {
    dispatch(changeCity(chosenCity));
    dispatch(resetSortType());
  };

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {Object.values(City).map((element) => (
          <li className="locations__item" key={element}>
            <p onClick={() => onCityClick(element)} className={element === city ? 'locations__item-link tabs__item tabs__item--active' : 'locations__item-link tabs__item'}>
              <span>{element}</span>
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default React.memo(CitiesList);

import React from 'react';
import PropTypes from 'prop-types';
import { City } from '../../constants';
import { connect } from 'react-redux';
import { ActionCreator } from '../../store/action';

function CitiesList(props) {
  const { city, onCityClick } = props;

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

CitiesList.propTypes = {
  city: PropTypes.string.isRequired,
  onCityClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  city: state.city,
});

const mapDispatchToProps = (dispatch) => ({
  onCityClick(city) {
    dispatch(ActionCreator.changeCity(city));
  },
});

export {CitiesList};
export default connect(mapStateToProps, mapDispatchToProps)(CitiesList);

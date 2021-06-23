import React from 'react';
import PropTypes from 'prop-types';
import { Cities } from '../constants';
import { connect } from 'react-redux';
import { ActionCreator } from '../store/action';

function CitiesList(props) {
  const { city, onCityClick } = props;

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {Object.values(Cities).map((element) => (
          <li className="locations__item" key={element}>
            <a onClick={(evt) =>{ evt.preventDefault(); onCityClick(element);}} className={element === city ? 'locations__item-link tabs__item tabs__item--active' : 'locations__item-link tabs__item'} href="/">
              <span>{element}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

const mapStateToProps = (state) => ({
  city: state.city,
});

const mapDispatchToProps = (dispatch) => ({
  onCityClick(city) {
    dispatch(ActionCreator.changeCity(city));
  },
});

CitiesList.propTypes = {
  city: PropTypes.string.isRequired,
  onCityClick: PropTypes.func.isRequired,
};

export {CitiesList};
export default connect(mapStateToProps, mapDispatchToProps)(CitiesList);

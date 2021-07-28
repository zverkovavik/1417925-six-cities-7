import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { sortTypes } from '../../constants';
import SortTypeMenuElement from '../sort-type-menu-element/sort-type-menu-element';


function SortTypeMenu(props) {
  const { sortType } = props;

  const sortTypeMenuRef = useRef();

  const handleSortTypeTitleClick = () => {
    sortTypeMenuRef.current.classList.toggle('visually-hidden');
  };

  const handleSortTypeElementClick = () => {
    sortTypeMenuRef.current.classList.add('visually-hidden');
  };

  return (
    <form
      className="places__sorting"
      action="#"
      method="get"
      data-testid="sort-menu"
    >
      <span className="places__sorting-caption">Sort by</span>
      <span onClick={handleSortTypeTitleClick} className="places__sorting-type" tabIndex={0} data-testid="sort-type-title">
        {sortType}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul ref={sortTypeMenuRef} className="places__options places__options--custom places__options--opened  visually-hidden">
        { sortTypes.map((element) => (
          <SortTypeMenuElement
            element={element}
            handleSortTypeElementClick={handleSortTypeElementClick}
            key={element}
          />)) }
      </ul>
    </form>
  );
}

SortTypeMenu.propTypes = {
  sortType: PropTypes.string.isRequired,
};

export default SortTypeMenu;

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { sortTypes } from '../../constants';
import SortTypeMenuElement from '../sort-type-menu-element/sort-type-menu-element';


function SortTypeMenu(props) {
  const { sortTypeName } = props;
  const [ shown, setShown ] = useState(false);

  return (
    <form onMouseEnter={() => setShown(true)} className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0}>
        {sortTypeName}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      {shown && (
        <ul onMouseLeave={() => setShown(false)} className="places__options places__options--custom places__options--opened">
          { sortTypes.map((element) => (
            <SortTypeMenuElement
              element={element}
              key={element}
            />)) }
        </ul>
      )}
    </form>
  );
}

SortTypeMenu.propTypes = {
  sortTypeName: PropTypes.string.isRequired,
};

export default SortTypeMenu;

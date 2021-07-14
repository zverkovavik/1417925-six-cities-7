import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { setSortType } from '../../store/action';
import { getSortType } from '../../store/app-data/selectors';

function SortTypeMenuElement(props) {

  const { element} = props;

  const sortType = useSelector(getSortType);

  const dispatch = useDispatch();
  const onSortTypeClick = (sortTypeName) => {
    dispatch(setSortType(sortTypeName));
  };

  return (
    <li onClick={(evt) => onSortTypeClick(evt.target.dataset.value)} data-value={element} key={element} className={sortType === element ? 'places__option places__option--active' : 'places__option'} tabIndex={0}>{element}</li>
  );
}

SortTypeMenuElement.propTypes = {
  element: PropTypes.string.isRequired,
};

export default SortTypeMenuElement;

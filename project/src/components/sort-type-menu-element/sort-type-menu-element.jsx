import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ActionCreator } from '../../store/action';

function SortTypeMenuElement(props) {
  const { element, sortTypeName, onSortTypeClick } = props;
  return (
    <li onClick={(evt) => onSortTypeClick(evt.target.dataset.value)} data-value={element} key={element} className={sortTypeName === element ? 'places__option places__option--active' : 'places__option'} tabIndex={0}>{element}</li>
  );
}

SortTypeMenuElement.propTypes = {
  element: PropTypes.string.isRequired,
  sortTypeName: PropTypes.string.isRequired,
  onSortTypeClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  sortTypeName: state.sortTypeName,
});

const mapDispatchToProps = (dispatch) => ({
  onSortTypeClick(sortTypeName) {
    dispatch(ActionCreator.setSortType(sortTypeName));
  },
});

export {SortTypeMenuElement};
export default connect(mapStateToProps, mapDispatchToProps)(SortTypeMenuElement);

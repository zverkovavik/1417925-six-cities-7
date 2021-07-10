import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ActionCreator } from '../store/action';
import { sortTypes } from '../constants';
import SortTypeMenuElement from './sort-type-element';


function SortTypeMenu(props) {
  const { isSortMenuShow, sortTypeName, onSortTypeMouseOver, onSortTypeMouseOut } = props;
  return (
    <form onMouseEnter={() => onSortTypeMouseOver()} onMouseLeave={() => onSortTypeMouseOut()} className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0}>
        {sortTypeName}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul className={isSortMenuShow ? 'places__options places__options--custom places__options--opened' : 'places__options places__options--custom' } >
        { sortTypes.map((element) => (
          <SortTypeMenuElement
            element={element}
            key={element}
          />)) }
      </ul>
    </form>
  );
}

SortTypeMenu.propTypes = {
  isSortMenuShow: PropTypes.bool.isRequired,
  sortTypeName: PropTypes.string.isRequired,
  onSortTypeMouseOver: PropTypes.func.isRequired,
  onSortTypeMouseOut: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isSortMenuShow: state.isSortMenuShow,
});

const mapDispatchToProps = (dispatch) => ({
  onSortTypeMouseOver() {
    dispatch(ActionCreator.showSortMenu());
  },
  onSortTypeMouseOut() {
    dispatch(ActionCreator.reserSortMenu());
  },
});

export {SortTypeMenu};
export default connect(mapStateToProps, mapDispatchToProps)(SortTypeMenu);

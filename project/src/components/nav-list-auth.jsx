import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { logout } from '../store/api-actions';
import { connect } from 'react-redux';
import { AppRoute } from '../constants';
function NavListForAuth (props) {
  const { login, logoutApp } = props;
  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link className="header__nav-link header__nav-link--profile" to={AppRoute.FAVORITES}>
            <div className="header__avatar-wrapper user__avatar-wrapper">
            </div>
            <span className="header__user-name user__name">{login}</span>
          </Link>
        </li>
        <li className="header__nav-item">
          <Link onClick={(evt) => {
            evt.preventDefault();
            logoutApp();
          }}
          className="header__nav-link" to="/"
          >
            <span className="header__signout">Sign out</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
NavListForAuth.propTypes = {
  login: PropTypes.string.isRequired,
  logoutApp: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  login: state.login,
});

const mapDispatchToProps = (dispatch) => ({
  logoutApp() {
    dispatch(logout());
  },
});

export {NavListForAuth};
export default connect(mapStateToProps, mapDispatchToProps)(NavListForAuth);

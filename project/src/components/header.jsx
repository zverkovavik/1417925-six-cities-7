import React from 'react';
import NavListLogin from './nav-list-login';
import NavListForAuth from './nav-list-auth';
import { AuthorizationStatus } from '../constants';
import Logo from '../components/logo';
import PropTypes from 'prop-types';

function Header(props) {
  const { authorizationStatus } = props;

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <Logo />
          { authorizationStatus === AuthorizationStatus.AUTH ? <NavListForAuth /> : <NavListLogin /> }
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
};

export { Header };

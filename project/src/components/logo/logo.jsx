import React from 'react';
import {Link} from 'react-router-dom';

function Logo() {
  return (
    <div className="header__left" data-testid="logo">
      <Link className="header__logo-a" to="/">
        <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
      </Link>
    </div>);
}

export default Logo;

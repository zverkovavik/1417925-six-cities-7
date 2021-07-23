import React from 'react';
import NavListLogin from '../nav-list-login/nav-list-login';
import NavListForAuth from '../nav-list-for-auth/nav-list-for-auth';
import { AuthorizationStatus } from '../../constants';
import Logo from '../logo/logo';
import { useSelector } from 'react-redux';
import { getAuthorizationStatus } from '../../store/user/selectors';


function Header(props) {
  const authorizationStatus = useSelector(getAuthorizationStatus);

  return (
    <header className="header" data-testid="header">
      <div className="container">
        <div className="header__wrapper">
          <Logo />
          { authorizationStatus === AuthorizationStatus.AUTH ? <NavListForAuth /> : <NavListLogin /> }
        </div>
      </div>
    </header>
  );
}

export default React.memo(Header);

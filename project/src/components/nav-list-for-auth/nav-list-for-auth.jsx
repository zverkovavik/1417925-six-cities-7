import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../store/api-actions';
import { AppRoute } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { getAvatarUrl, getLogin } from '../../store/user/selectors';
import { resetSortType } from '../../store/action';

function NavListForAuth () {

  const dispatch = useDispatch();
  const login = useSelector(getLogin);
  const avatarUrl = useSelector(getAvatarUrl);
  const logoutApp = () => {
    dispatch(resetSortType());
    dispatch(logout());
  };

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link className="header__nav-link header__nav-link--profile" to={AppRoute.FAVORITES}>
            <div className="header__avatar-wrapper user__avatar-wrapper">
              {avatarUrl && (<img src={avatarUrl} alt="avatar" style={{borderRadius: '50%'}}/>)}
            </div>
            <span className="header__user-name user__name" data-testid="user-email">{login}</span>
          </Link>
        </li>
        <li className="header__nav-item">
          <Link onClick={(evt) => {
            evt.preventDefault();
            logoutApp();
          }}
          className="header__nav-link" to="/"
          >
            <span className="header__signout" data-testid="sign-out">Sign out</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavListForAuth;

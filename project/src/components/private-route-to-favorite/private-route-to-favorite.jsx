import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAuthorizationStatus } from '../../store/user/selectors';
import { AppRoute, AuthorizationStatus } from '../../constants';

function PrivateRouteToFavorite ({render, path, exact}) {

  const authorizationStatus = useSelector(getAuthorizationStatus);
  return (
    <Route
      exact={exact}
      path={path}
      render={(routeProps) => (
        authorizationStatus === AuthorizationStatus.AUTH
          ? render(routeProps)
          : <Redirect to={AppRoute.LOGIN} />
      )}
    />
  );
}

PrivateRouteToFavorite.propTypes = {
  exact: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
};

export default PrivateRouteToFavorite;

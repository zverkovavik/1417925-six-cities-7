import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAuthorizationStatus } from '../../store/user/selectors';
import { AppRoute, AuthorizationStatus } from '../../constants';

function PrivateRouteToLogin ({render, path, exact }) {

  const authorizationStatus = useSelector(getAuthorizationStatus);
  return (
    <Route
      exact={exact}
      path={path}
      render={(routeProps) => (
        authorizationStatus === AuthorizationStatus.NO_AUTH || authorizationStatus === AuthorizationStatus.UNKNOWN
          ? render(routeProps)
          : <Redirect to={AppRoute.ROOT} />
      )}
    />
  );
}

PrivateRouteToLogin.propTypes = {
  exact: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
};

export default PrivateRouteToLogin;

import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { AppRoute, AuthorizationStatus } from '../../constants';

function PrivateRouteToLogin ({render, path, exact, authorizationStatus}) {
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
  authorizationStatus: PropTypes.string.isRequired,
  exact: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  authorizationStatus: state.authorizationStatus,
});

export { PrivateRouteToLogin };
export default connect(mapStateToProps, null)(PrivateRouteToLogin);

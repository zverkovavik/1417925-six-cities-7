import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { AppRoute, AuthorizationStatus } from '../../constants';

function PrivateRouteToFavorite ({render, path, exact, authorizationStatus}) {
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
  authorizationStatus: PropTypes.string.isRequired,
  exact: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  authorizationStatus: state.authorizationStatus,
});

export { PrivateRouteToFavorite };
export default connect(mapStateToProps, null)(PrivateRouteToFavorite);

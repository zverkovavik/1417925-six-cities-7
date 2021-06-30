import React from 'react';
import MainPage from '../../routes/main-page';
import { Router as BrowserRouter, Switch, Route } from 'react-router-dom';
import { AppRoute } from '../../constants';
import LoginScreen from '../../routes/login';
import Favorites from '../../routes/favorites';
import Room from '../../routes/room';
import NotFoundScreen from '../../routes/not-found';
import LoadingScreen from '../loading-screen';
import { isCheckedAuth } from '../../utils';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PrivateRoute from '../private-route/private-route';
import browserHistory from '../../browser-history';
function App(props) {

  const {authorizationStatus, isDataLoaded } = props;
  if (isCheckedAuth(authorizationStatus) || !isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route exact path={AppRoute.ROOT}>
          <MainPage />;
        </Route>
        <Route exact path={AppRoute.LOGIN}>
          <LoginScreen />
        </Route>
        <PrivateRoute exact path={AppRoute.FAVORITES} render={() => <Favorites />}>
        </PrivateRoute>
        <Route exact path={AppRoute.ROOM}>
          <Room />
        </Route>
        <Route>
          <NotFoundScreen />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

App.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  isDataLoaded: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: state.authorizationStatus,
  isDataLoaded: state.isDataLoaded,
});

export {App};
export default connect(mapStateToProps, null)(App);

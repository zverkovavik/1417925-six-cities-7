import React from 'react';
import MainPage from '../../routes/main-page';
// import cardsProp from '../../mocks/offers-prop';
// import reviewsProp from '../../mocks/reviews-prop';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AppRoute } from '../../constants';
import Login from '../../routes/login';
import Favorites from '../../routes/favorites';
import Room from '../../routes/room';
import NotFoundScreen from '../../routes/not-found';
import LoadingScreen from '../loading-screen';
import { isCheckedAuth } from '../../utils';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function App(props) {

  const {authorizationStatus, isDataLoaded, cards} = props;
  if (isCheckedAuth(authorizationStatus) || !isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.ROOT}>
          <MainPage cards={cards} />;
        </Route>
        <Route exact path={AppRoute.LOGIN}>
          <Login />
        </Route>
        <Route  exact path={AppRoute.FAVORITES}>
          <Favorites cards={cards} />
        </Route>
        <Route exact path={AppRoute.ROOM}>
          <Room cards={cards} />
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
  cards: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: state.authorizationStatus,
  isDataLoaded: state.isDataLoaded,
  cards: state.cards,
});

export {App};
export default connect(mapStateToProps, null)(App);

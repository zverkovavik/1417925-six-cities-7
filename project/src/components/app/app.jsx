import React, { useEffect } from 'react';
import MainPage from '../main-page/main-page';
import { Switch, Route } from 'react-router-dom';
import { AppRoute } from '../../constants';
import LoginScreen from '../login-screen/login-screen';
import Favorites from '../favorites/favorites';
import Room from '../room/room';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import LoadingScreen from '../loading-screen/loading-screen';
import { isCheckedAuth } from '../../utils/utils';
import PrivateRouteToFavorite from '../private-route-to-favorite/private-route-to-favorite';
import PrivateRouteToLogin from '../private-route-to-login/private-route-to-login';
import { init } from './actions/init';
import { getAuthorizationStatus } from '../../store/user/selectors';
import { getLoadedDataStatus } from '../../store/data/selectors';
import { useDispatch, useSelector } from 'react-redux';

function App(props) {

  const isDataLoaded = useSelector(getLoadedDataStatus);
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(init());
  }, []);

  if (isCheckedAuth(authorizationStatus) || !isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <Switch>
      <Route exact path={AppRoute.ROOT}>
        <MainPage />;
      </Route>
      <PrivateRouteToLogin exact path={AppRoute.LOGIN} render={() => <LoginScreen />} />
      <PrivateRouteToFavorite exact path={AppRoute.FAVORITES} render={() => <Favorites />} />
      <Route exact path={AppRoute.ROOM}>
        <Room />
      </Route>
      <Route>
        <NotFoundScreen />
      </Route>
    </Switch>
  );
}

export default App;

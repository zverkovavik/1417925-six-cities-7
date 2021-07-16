import React, { useEffect } from 'react';
import MainPage from '../../routes/main-page/main-page';
import { Router as BrowserRouter, Switch, Route } from 'react-router-dom';
import { AppRoute } from '../../constants';
import LoginScreen from '../../routes/login/login';
import Favorites from '../../routes/favorites/favorites';
import Room from '../../routes/room/room';
import NotFoundScreen from '../../routes/not-found-screen/not-found-screen';
import LoadingScreen from '../loading-screen/loading-screen';
import { isCheckedAuth } from '../../utils/utils';
import PrivateRouteToFavorite from '../private-route-to-favorite/private-route-to-favorite';
import PrivateRouteToLogin from '../private-route-to-login/private-route-to-login';
import browserHistory from '../../browser-history';
import { init } from './actions/init';
import { getAuthorizationStatus } from '../../store/user/selectors';
import { getLoadedDataStatus } from '../../store/app-data/selectors';
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
    <BrowserRouter history={browserHistory}>
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
    </BrowserRouter>
  );
}

export default App;

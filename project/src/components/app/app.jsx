import React from 'react';
import MainPage from '../../routes/main-page';
import cardsProp from '../../mocks/offers-prop';
import reviewsProp from '../../mocks/reviews-prop';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AppRoute } from '../../constants';
import Login from '../../routes/login';
import Favorites from '../../routes/favorites';
import Room from '../../routes/room';
import NotFoundScreen from '../../routes/not-found';


function App(props) {
  const { cards, reviews } = props;
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.ROOT}>
          <MainPage cards={cards} />;
        </Route>
        <Route  exact path={AppRoute.LOGIN}>
          <Login />
        </Route>
        <Route  exact path={AppRoute.FAVORITES}>
          <Favorites cards={cards} />
        </Route>
        <Route exact path={AppRoute.ROOM}>
          <Room cards={cards} reviews={reviews} />
        </Route>
        <Route>
          <NotFoundScreen />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

App.propTypes = {
  cards: cardsProp,
  reviews: reviewsProp,
};

export default App;

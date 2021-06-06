import React from 'react';
import MainPage from '../main-page/main-page';
import PropTypes from 'prop-types';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AppRoute } from '../../constants';
import Login from '../pages/login';
import Favorites from '../pages/favorites';
import Room from '../pages/room';
import NotFoundScreen from '../pages/not-found';


function App(props) {
  const {cards} = props;
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.ROOT}>
          <MainPage cards={cards} />);
        </Route>
        <Route  exact path={AppRoute.LOGIN}>
          <Login />
        </Route>
        <Route  exact path={AppRoute.FAVORITES}>
          <Favorites />
        </Route>
        <Route exact path={AppRoute.ROOM}>
          <Room cards={cards}/>
        </Route>
        <Route>
          <NotFoundScreen />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

App.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      isPremium: PropTypes.bool.isRequired,
      imgUrl: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      isBookmark: PropTypes.bool.isRequired,
      rating: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default App;

import React,  { useEffect, useState }  from 'react';
import { Link } from 'react-router-dom';
import FooterLogo from '../../components/footer-logo/footer-logo';
import Header from '../../components/header/header';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthorizationStatus } from '../../store/user/selectors';
import {  getCards, getFavoriteList } from '../../store/data/selectors';
import LoadingScreen from '../../components/loading-screen/loading-screen';
import { fetchFavoriteList } from '../../store/api-actions';
import FavoritesEmpty from '../../components/favorite-empty/favorites-empty';
import FavoriteCard from '../../components/favorite-card/favorite-card';
import { changeCity } from '../../store/action';

function Favorites(props) {

  const dispatch = useDispatch();
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const favoriteList = useSelector(getFavoriteList);
  const cards = useSelector(getCards);
  const [isDataLoaded, setLoadingDataStatus] = useState(false);
  const [isError, setErrorStatus] = useState(false);

  useEffect(() => {
    dispatch(fetchFavoriteList())
      .then(() => setLoadingDataStatus(true))
      .catch(() => {
        setLoadingDataStatus(true);
        setErrorStatus(true);
      });
  }, [cards]);

  const set = [...new Set(favoriteList.map((city) => city.city.name))];

  if (!isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <div className="page">
      <Header authorizationStatus={authorizationStatus} />
      {!favoriteList.length ? <FavoritesEmpty isError={isError}/> : (
        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {set.map((city) => (
                  <li key={city} className="favorites__locations-items">
                    <div onClick={() => dispatch(changeCity(city))} className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <Link className="locations__item-link" to="/">
                          <span>{city}</span>
                        </Link>
                      </div>
                    </div>
                    <div className="favorites__places">
                      {favoriteList.filter((element) => element.city.name === city).map((card) => (
                        <FavoriteCard
                          id = {card.id}
                          previewImage = {card.previewImage}
                          price = {card.price}
                          rating = {card.rating}
                          title = {card.title}
                          type = {card.type}
                          key = {card.title}
                        />),
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </main>)}
      <FooterLogo />
    </div>);
}

export default Favorites;

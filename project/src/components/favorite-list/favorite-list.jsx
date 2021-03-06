import React,  { useEffect, useState }  from 'react';
import { Link } from 'react-router-dom';
import Footer from '../footer/footer';
import Header from '../header/header';
import { useDispatch, useSelector } from 'react-redux';
import { getCards, getFavoriteList, getFavorites } from '../../store/data/selectors';
import LoadingScreen from '../loading-screen/loading-screen';
import { fetchFavoriteList } from '../../store/api-actions';
import FavoriteEmptyList from '../favorite-empty-list/favorite-empty-list';
import FavoriteCard from '../favorite-card/favorite-card';
import { changeCity } from '../../store/action';

function FavoriteList() {

  const dispatch = useDispatch();
  const favoriteList = useSelector(getFavoriteList);
  const cards = useSelector(getCards);
  const favorites = useSelector(getFavorites);
  const [isDataLoaded, setLoadingDataStatus] = useState(false);
  const [isError, setErrorStatus] = useState(false);

  useEffect(() => {
    dispatch(fetchFavoriteList())
      .then(() => setLoadingDataStatus(true))
      .catch(() => {
        setLoadingDataStatus(true);
        setErrorStatus(true);
      });

  }, [dispatch, cards]);

  if (!isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <div className="page">
      <Header />
      {!favoriteList.length ? <FavoriteEmptyList isError={isError}/> : (
        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {favorites.map((city) => (
                  <li key={city.name} className="favorites__locations-items">
                    <div onClick={() => dispatch(changeCity(city.name))} className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <Link className="locations__item-link" to="/">
                          <span>{city.name}</span>
                        </Link>
                      </div>
                    </div>
                    <div className="favorites__places" data-testid="favorite-places">
                      {city.cards.map((card) => (
                        <FavoriteCard
                          id = {card.id}
                          isPremium={card.isPremium}
                          previewImage = {card.previewImage}
                          price = {card.price}
                          rating = {card.rating}
                          title = {card.title}
                          type = {card.type}
                          key = {card.title + card.id}
                        />),
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </main>)}
      <Footer />
    </div>);
}

export default FavoriteList;

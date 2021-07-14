import React from 'react';
import FavoriteCard from '../../components/favorite-card/favorite-card';
import FooterLogo from '../../components/footer-logo/footer-logo';
import { Header } from '../../components/header/header';
import { useSelector } from 'react-redux';
import { getAuthorizationStatus } from '../../store/user/selectors';
import { getCards } from '../../store/app-data/selectors';

function Favorites(props) {

  const authorizationStatus = useSelector(getAuthorizationStatus);
  const cards = useSelector(getCards);

  return (
    <div className="page">
      <Header authorizationStatus={authorizationStatus} />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              <li className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <a className="locations__item-link" href="/">
                      <span>Amsterdam</span>
                    </a>
                  </div>
                </div>
                <div className="favorites__places">
                  {cards.filter((card) => card.isFavorite).map((card) => (
                    <FavoriteCard
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
            </ul>
          </section>
        </div>
      </main>
      <FooterLogo />
    </div>);
}

export default Favorites;

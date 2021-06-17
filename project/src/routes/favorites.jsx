import React from 'react';
import FavoriteCard from '../components/favorite-card';
import FooterLogo from '../components/footer-logo';
import Logo from '../components/logo';
import PropTypes from 'prop-types';
function Favorites(props) {
  const { cards } = props;
  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo />
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="/">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="/">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

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

Favorites.propTypes = PropTypes.arrayOf(
  PropTypes.shape({
    previewImage: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    isFavorite: PropTypes.bool.isRequired,
    rating: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }),
).isRequired;

export default Favorites;

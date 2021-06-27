import React from 'react';
import FavoriteCard from '../components/favorite-card';
import FooterLogo from '../components/footer-logo';
import PropTypes from 'prop-types';
import { Header } from '../components/header';
import { connect } from 'react-redux';

function Favorites(props) {
  const { cards, authorizationStatus } = props;
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

Favorites.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      previewImage: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      isFavorite: PropTypes.bool.isRequired,
      rating: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    }),
  ).isRequired,
  authorizationStatus: PropTypes.string.isRequired,
};


const mapStateToProps = (state) => ({
  authorizationStatus: state.authorizationStatus,
  cards: state.cards,
});

export {Favorites};
export default connect(mapStateToProps, null)(Favorites);

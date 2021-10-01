import React from 'react';
import OffersList from '../../components/offers-list/offers-list';
import Map from '../../components/map/map';
import CitiesList from '../../components/cities-list/cities-list';
import { useSelector } from 'react-redux';
import Header from '../../components/header/header';
import { getSortData } from '../../store/data/selectors';
import MainPageEmpty from '../../components/main-page-empty/main-page-empty';

function MainPage() {

  const adsList = useSelector(getSortData);
  return (
    <div>
      <div className="page page--gray page--main">
        <Header />
        <main className="page__main page__main--index" data-testid="welcome-screen">
          <h1 className="visually-hidden">Cities</h1>
          <div className="tabs">
            <CitiesList />
          </div>
          <div className="cities">
            <div className="cities__places-container container">
              {adsList.length ? <OffersList /> : <MainPageEmpty />}
              <div className="cities__right-section">
                <section className="cities__map map" data-testid="map">
                  {adsList.length && (<Map adsList={adsList} />)}
                </section>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default MainPage;

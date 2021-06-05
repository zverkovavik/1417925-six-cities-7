import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

const Cards = [
  {
    isPremium: true,
    imgUrl: 'img/apartment-01.jpg',
    price: 120,
    isBookmark: false,
    rating: 80,
    title: 'Beautiful &amp; luxurious apartment at great location',
    type: 'Apartment',
  },
  {
    isPremium: false,
    imgUrl: 'img/room.jpg',
    price: 80,
    isBookmark: true,
    rating: 80,
    title: 'Wood and stone place',
    type: 'Private room',
  },
  {
    isPremium: false,
    imgUrl: 'img/apartment-02.jpg',
    price: 132,
    isBookmark: false,
    rating: 80,
    title: 'Canal View Prinsengracht',
    type: 'Apartment',
  },
  {
    isPremium: true,
    imgUrl: 'img/apartment-03.jpg',
    price: 180,
    isBookmark: false,
    rating: 100,
    title: 'Nice, cozy, warm big bed apartment',
    type: 'Apartment',
  },
  {
    isPremium: false,
    imgUrl: 'img/room.jpg',
    price: 80,
    isBookmark: false,
    rating: 80,
    title: 'Wood and stone place',
    type: 'Private room',
  },
];

ReactDOM.render(
  <React.StrictMode>
    <App cards={Cards}/>
  </React.StrictMode>,
  document.getElementById('root'));

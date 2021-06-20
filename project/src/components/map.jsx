import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import useMap from '../useMap';

const FIRST_ARRAY_ELEMENT = 0;
const MARKER_URL = 'img/pin.svg';

function Map(props) {
  const { cards } = props;

  const city = cards[FIRST_ARRAY_ELEMENT];

  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  const icon = leaflet.icon({
    iconUrl: MARKER_URL,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  });


  useEffect(() => {
    if (map) {
      cards.forEach((ad) => {
        leaflet
          .marker({
            lat: ad.location.latitude,
            lng: ad.location.longitude,
          }, {
            icon: icon,
          })
          .addTo(map);
      });
    }
  }, [map, cards, icon]);

  return (
    <div id="map" style= {{ height: '100%' }} ref={mapRef}></div>
  );
}

Map.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      location: PropTypes.shape({
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
        zoom: PropTypes.number.isRequired,
      }),
    }),
  ),
};

export default Map;

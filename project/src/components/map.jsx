import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import useMap from '../useMap';
import { connect } from 'react-redux';
import { getCardWithTheSameId } from '../utils';
import offersInMap from '../prop-types/offers-used-in-map';

const FIRST_ARRAY_ELEMENT = 0;
const MARKER_URL = 'img/pin.svg';
const ACTIVE_MARKER_URL = 'img/pin-active.svg';

function Map(props) {
  const { activeCardId, cards, adsList } = props;
  const city = adsList[FIRST_ARRAY_ELEMENT];

  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  const icon = leaflet.icon({
    iconUrl: MARKER_URL,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  });

  const activeIcon = leaflet.icon({
    iconUrl: ACTIVE_MARKER_URL,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  });

  useEffect(() => {
    if (map) {
      map.eachLayer((layer) => {
        if (layer.getElement) {
          layer.remove();
        }
      });

      getCardWithTheSameId(cards, activeCardId).forEach((ad) => {
        leaflet
          .marker({
            lat: ad.location.latitude,
            lng: ad.location.longitude,
          }, {
            icon: activeIcon,
          })
          .addTo(map);
      });

      adsList.filter((element) => element.id !== activeCardId).forEach((ad) => {
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
  }, [map, adsList, cards, activeCardId, icon, activeIcon]);

  return (
    <div id="map" style={{ height: '100%' }} ref={mapRef}></div>
  );
}

const mapStateToProps = (state) => ({
  activeCardId: state.activeCardId,
  cards: state.cards,
});

Map.propTypes = {
  adsList: offersInMap,
  activeCardId: PropTypes.number.isRequired,
  cards: offersInMap,
};

export {Map};
export default connect(mapStateToProps, null)(Map);

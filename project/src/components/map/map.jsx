import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useRef, useEffect } from 'react';
import useMap from '../../hooks/use-map';
import { useSelector } from 'react-redux';
import { getCardWithTheSameId } from '../../utils/utils';
import offersInMap from '../../prop-types/offers-used-in-map';
import { filterCardsByCurrentCity } from '../../routes/main-page/selectors';
import { getActiveCardId } from '../../store/app-logic/selectors';
import { getCards } from '../../store/app-data/selectors';
import { getCity } from '../../store/app-data/selectors';

const FIRST_ARRAY_ELEMENT = 0;
const MarkerUrl = {
  MARKER_URL: 'img/pin.svg',
  ACTIVE_MARKER_URL: 'img/pin-active.svg',
};

function Map(props) {
  const { adsList } = props;

  const activeCardId = useSelector(getActiveCardId);
  const cards = useSelector(getCards);
  const chosenCity = useSelector(getCity);

  const city = (filterCardsByCurrentCity(cards, chosenCity))[FIRST_ARRAY_ELEMENT];

  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  const icon = leaflet.icon({
    iconUrl: MarkerUrl.MARKER_URL,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  });

  const activeIcon = leaflet.icon({
    iconUrl: MarkerUrl.ACTIVE_MARKER_URL,
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


Map.propTypes = {
  adsList: offersInMap,
};

export default Map;

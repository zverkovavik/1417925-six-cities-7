import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useRef, useEffect } from 'react';
import useMap from '../../hooks/use-map';
import { useSelector } from 'react-redux';
import { getCardWithTheSameId } from '../../utils/utils';
import offersInMap from '../../prop-types/offers-used-in-map';
import { getActiveCardId } from '../../store/data/selectors';
import { getCards, filterCardsByCurrentCity } from '../../store/data/selectors';

const FIRST_ARRAY_ELEMENT = 0;
const MarkerUrl = {
  MARKER_URL: 'img/pin.svg',
  ACTIVE_MARKER_URL: 'img/pin-active.svg',
};

function Map(props) {
  const { adsList } = props;

  const activeCardId = useSelector(getActiveCardId);
  const cards = useSelector(getCards);
  const apartmentAds = useSelector(filterCardsByCurrentCity);
  const city = apartmentAds[FIRST_ARRAY_ELEMENT];

  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  const icon = leaflet.icon({
    iconUrl: MarkerUrl.MARKER_URL,
    iconSize: [27, 39],
    iconAnchor: [13, 39],
  });

  const activeIcon = leaflet.icon({
    iconUrl: MarkerUrl.ACTIVE_MARKER_URL,
    iconSize: [27, 39],
    iconAnchor: [13, 39],
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
    <div id="map" data-testid="leaflet-map" style={{ height: '100%' }} ref={mapRef}></div>
  );
}


Map.propTypes = {
  adsList: offersInMap,
};

export default React.memo(Map);

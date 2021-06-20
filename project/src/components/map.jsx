import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import useMap from '../useMap';
import { connect } from 'react-redux';

const FIRST_ARRAY_ELEMENT = 0;
const MARKER_URL = 'img/pin.svg';

function Map(props) {
  const { adsList, cards } = props;

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
      map.eachLayer((layer) => {
        if (layer.getElement) {
          layer.remove();
        }
      });
      adsList.forEach((ad) => {
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
  }, [map, adsList, icon]);

  return (
    <div id="map" style={{ height: '100%' }} ref={mapRef}></div>
  );
}

const mapStateToProps = (state) => ({
  adsList: state.adsList,
});

Map.propTypes = {
  adsList: PropTypes.array.isRequired,
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

export {Map};
export default connect(mapStateToProps, null)(Map);

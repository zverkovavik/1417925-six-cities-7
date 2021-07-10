import React, {useEffect, useState} from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import PropTypes from 'prop-types';

function useMap(mapRef, city) {

  const [map, setMap] = useState(null);

  useEffect(() => {
    if (mapRef.current !== null && map === null) {
      const instance = leaflet.map('map', {
        center: {
          lat: city.city.location.latitude,
          lng: city.city.location.longitude,
        },
        zoom: city.city.location.zoom,
        zoomControl: false,
        marker: true,
      });
      instance.setView([city.city.location.latitude, city.city.location.longitude], city.city.location.zoom);

      leaflet.tileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        }).addTo(instance);

      setMap(instance);

    } else {
      map.panTo(new leaflet.LatLng(city.city.location.latitude, city.city.location.longitude));
    }
  }, [mapRef, map, city]);

  return map;
}


useMap.propTypes = {
  city: PropTypes.shape({
    location: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
      zoom: PropTypes.number.isRequired,
    }),
  }),
};

export default useMap;

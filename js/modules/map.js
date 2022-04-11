import {generateAdvertisingMarkup} from './generate-advertising-markup.js';
import {activateForm, activateFilter} from './form.js';
import {mapOptions} from './map-options.js';

const addressField = document.querySelector('#address');

/* Init map */
const map = L.map('map-canvas')
  .on('load', () => {
    activateForm();
    activateFilter();
  })
  .setView(mapOptions.initLocation, 12);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

/* Add marker */
const mainPinIcon = L.icon(mapOptions.mainPinIcon);

const mainMarker = L.marker(
  mapOptions.initLocation,
  {
    icon: mainPinIcon,
    draggable: true,
  }
);
mainMarker.addTo(map);

/* Get Main marker position */
const updateMainMarkerPosition = (lat, lng) => {
  addressField.value = `${lat}, ${lng}`;
};

const onMarkerPut = (evt) => {
  const markerPosition = evt.target.getLatLng();
  const markerPositionLat = markerPosition.lat.toFixed(5);
  const markerPositionLng = markerPosition.lng.toFixed(5);

  updateMainMarkerPosition(markerPositionLat, markerPositionLng);
};

mainMarker.on('moveend', onMarkerPut);

/* Render advertisements on map*/
const icon = L.icon(mapOptions.icon);

const setStartPoint = () => {
  mainMarker.setLatLng(mapOptions.initLocation);
};

const renderMap = (advertisements) => {
  advertisements.forEach((advertisement) => {
    const lat = advertisement.location.lat;
    const lng = advertisement.location.lng;

    const marker = L.marker(
      {
        lat,
        lng,
      },
      {
        icon,
      },
    );

    marker
      .addTo(map)
      .bindPopup(generateAdvertisingMarkup(advertisement));
  });

};

export {renderMap, setStartPoint};

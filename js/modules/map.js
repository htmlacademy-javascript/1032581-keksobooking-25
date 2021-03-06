import { generateAdvertisingMarkup } from './generate-advertising-markup.js';
import { activateForm } from './form.js';
import { activateFilter } from './filter.js';
import { mapOptions } from '../options/map-options.js';
import { getData } from './load.js';
import { showAlert } from './util.js';

const COUNT_SHOWED_ADVS = 10;
const MAP_ZOOM_VALUE = 12;
const DATA_ERROR_MESSAGE = 'Ошибка загрузки кексососедей с сервера';

const addressField = document.querySelector('#address');

/* Create map */
const map = L.map('map-canvas');

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

/* Add marker group */
const markerGroup = L.layerGroup().addTo(map);

/* Get Main marker position */
const updateMainMarkerPosition = (lat, lng) => {
  addressField.value = `${lat}, ${lng}`;
};

const onMarkerMoveend = (evt) => {
  const markerPosition = evt.target.getLatLng();
  const markerPositionLat = markerPosition.lat.toFixed(5);
  const markerPositionLng = markerPosition.lng.toFixed(5);

  updateMainMarkerPosition(markerPositionLat, markerPositionLng);
};

mainMarker.on('moveend', onMarkerMoveend);

/* Render advertisements on map*/
const icon = L.icon(mapOptions.icon);

const setStartPoint = () => {
  mainMarker.setLatLng(mapOptions.initLocation);
  map.closePopup();
};

const renderMap = (advertisements) => {
  markerGroup.clearLayers();
  advertisements
    .slice(0, COUNT_SHOWED_ADVS)
    .forEach((advertisement) => {
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
        .addTo(markerGroup)
        .bindPopup(generateAdvertisingMarkup(advertisement));
    });
};

const initMap = () => {
  map.on('load', () => {
    activateForm();
    getData(
      (advertisements) => {
        renderMap(advertisements);
        activateFilter(advertisements);
      },
      () => {
        showAlert(DATA_ERROR_MESSAGE);
      }
    );
  })
    .setView(mapOptions.initLocation, MAP_ZOOM_VALUE);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
};

export { initMap, renderMap, setStartPoint };

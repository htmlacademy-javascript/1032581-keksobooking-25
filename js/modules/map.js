import {createSimilarAdvertisements} from './create-advertisements.js';
import {generateAdvertisingMarkup} from './generate-advertising-markup.js';
import {activateForm} from './form.js';

const initMap = () => {
  const addressField = document.querySelector('#address');

  /* Init map */
  const map = L.map('map-canvas')
    .on('load', () => {
      activateForm();
    })
    .setView({
      lat: 35.6762,
      lng: 139.6503,
    }, 12);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  /* Add marker */
  const mainPinIcon = L.icon({
    iconUrl: './img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });

  const mainMarker = L.marker(
    {
      lat: 35.6762,
      lng: 139.6503,
    },
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
  const advertisements = createSimilarAdvertisements();

  const icon = L.icon({
    iconUrl: './img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

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

export {initMap};

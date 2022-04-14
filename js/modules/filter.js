import {renderMap} from './map.js';
import {priceOptions} from './filter-options.js';

const filterForm = document.querySelector('.map__filters');
const typeField = filterForm.querySelector('#housing-type');
const priceField = filterForm.querySelector('#housing-price');
const roomsField = filterForm.querySelector('#housing-rooms');
const guestsField = filterForm.querySelector('#housing-guests');
const filterFormFieldsets = filterForm.querySelectorAll('fieldset');
const filterFormSelects = filterForm.querySelectorAll('.map__filter');

const DEFAULT_FILTER_VALUE = 'any';

/* States */
const deactivateFilter = () => {
  filterForm.classList.add('ad-form--disabled');

  for(const fieldset of filterFormFieldsets) {
    fieldset.setAttribute('disabled', '');
  }
  for(const select of filterFormSelects) {
    select.setAttribute('disabled', '');
  }
};

const activateFilter = (advertisements) => {
  filterForm.classList.remove('ad-form--disabled');

  for(const fieldset of filterFormFieldsets) {
    fieldset.removeAttribute('disabled');
  }
  for(const select of filterFormSelects) {
    select.removeAttribute('disabled', '');
  }

  filterForm.addEventListener('change', () => {
    let filteredAdvertisements = advertisements.slice();

    if (typeField.value !== DEFAULT_FILTER_VALUE) {
      filteredAdvertisements = filteredAdvertisements.filter((item) => typeField.value === item.offer.type);
    }

    if (priceField.value !== DEFAULT_FILTER_VALUE) {
      filteredAdvertisements = filteredAdvertisements.filter((item) =>
        priceOptions[priceField.value].min < item.offer.price &&
        priceOptions[priceField.value].max >= item.offer.price);
    }

    if (roomsField.value !== DEFAULT_FILTER_VALUE) {
      filteredAdvertisements = filteredAdvertisements.filter((item) => Number(roomsField.value) === item.offer.rooms);
    }

    if (guestsField.value !== DEFAULT_FILTER_VALUE) {
      filteredAdvertisements = filteredAdvertisements.filter((item) => Number(guestsField.value) === item.offer.guests);
    }

    const featuresInputList = filterForm.querySelectorAll('#housing-features input[name="features"]:checked');

    if (featuresInputList.length) {
      featuresInputList.forEach((element) => {
        filteredAdvertisements = filteredAdvertisements.filter((item) => {
          if (item.offer.features) {
            const featuresList = item.offer.features;
            return featuresList.includes(element.value);
          }
        });
      });
    }

    renderMap(filteredAdvertisements);
  });
};

export {activateFilter, deactivateFilter};

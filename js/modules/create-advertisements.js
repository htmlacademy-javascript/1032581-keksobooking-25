import {titles, types, times, features, descriptions, photos} from './data.js';
import {getRandomInteger, getRandomFloat} from './util.js';
import {getRandomArrayElement, getRandomArrayOfStrings, getArrayOfStrings} from './array-methods.js';

const createAdvertisement = (element, index) => {
  const LOCATION_LAT = getRandomFloat(35.65000, 35.70000, 5);
  const LOCATION_LNG = getRandomFloat(139.70000, 139.80000, 5);

  return ({
    author: {
      avatar: `img/avatars/user${(index + 1 < 10) ? `0${index + 1}` : (index + 1)}.png`,
    },
    offer: {
      title: getRandomArrayElement(titles),
      address: `${LOCATION_LAT}, ${LOCATION_LNG}`,
      price: getRandomInteger(1, Number.MAX_SAFE_INTEGER),
      type: getRandomArrayElement(types),
      rooms: getRandomInteger(1, Number.MAX_SAFE_INTEGER),
      guests: getRandomInteger(1, Number.MAX_SAFE_INTEGER),
      checkin: getRandomArrayElement(times),
      checkout: getRandomArrayElement(times),
      features: getRandomArrayOfStrings(features, getRandomInteger(0, features.length - 1)),
      description: getRandomArrayElement(descriptions),
      photos: getArrayOfStrings(photos),
    },
    location: {
      lat: LOCATION_LAT,
      lng: LOCATION_LNG,
    },
  });
};

const createSimilarAdvertisements = () => Array.from({length: 10}, createAdvertisement);

export {createSimilarAdvertisements};

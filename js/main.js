const titles = [
  'title1',
  'title2',
  'title3',
  'title4',
  'title5',
];

const types = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const times = [
  '12:00',
  '13:00',
  '14:00',
];

const features = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

const descriptions = [
  'Description1: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s',
  'Description2: When an unknown printer took a galley of type and scrambled it to make a type specimen book.',
  'Description3: It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
  'Description4: It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.',
  'Description5: And more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
];

const photos = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const getRandomInteger = (min, max) => {
  if(min < 0 || max < 0 || max < min || min === max) {
    return false;
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomFloat = (min, max, numberOfSymbolsAfterComma) => {
  if(min < 0 || max < 0 || max < min || min === max) {
    return false;
  }
  return (Math.random() * (max - min) + min).toFixed(numberOfSymbolsAfterComma);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const getRandomArrayOfStrings = (elements, randomNumber) => {
  const randomArray = [];

  for(let i = 0; i < randomNumber; i++){
    randomArray.push(elements[getRandomInteger(0, elements.length - 1)]);
  }

  const uniqueArray = new Set(randomArray);
  Array.from(uniqueArray);

  return uniqueArray;
};

const getArrayOfStrings = (elements) => elements.slice(0, getRandomInteger(1, elements.length - 1));

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

const similarAdvertisements = Array.from({length: 10}, createAdvertisement);

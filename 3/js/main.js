const TITLES = [
  'title1',
  'title2',
  'title3',
  'title4',
  'title5',
]

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
]

const TIMES = [
  '12:00',
  '13:00',
  '14:00',
]

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
]

const DESCRIPTIONS = [
  'Description1: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s',
  'Description2: When an unknown printer took a galley of type and scrambled it to make a type specimen book.',
  'Description3: It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
  'Description4: It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.',
  'Description5: And more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
]

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
]

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

const getRandomArrayElement = (elements) => {
  return elements[getRandomInteger(0, elements.length - 1)];
};

const getRandomArrayOfStrings = (elements) => {
  return elements.slice(0, getRandomInteger(1, elements.length - 1));
}

const createAdvertisement = (element, index) => {
  return {
    author: {
      avatar: `img/avatars/user${index + 1}.png`,
    },
    offer: {
      title: getRandomArrayElement(TITLES),
      address: `${getRandomFloat(35.65000, 35.70000, 5)}, ${getRandomFloat(139.70000, 139.80000, 5)}`,
      price: getRandomInteger(1500, 6000),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomInteger(1, 4),
      guests: getRandomInteger(1, 12),
      checkin: getRandomArrayElement(TIMES),
      checkout: getRandomArrayElement(TIMES),
      features: getRandomArrayOfStrings(FEATURES),
      description: getRandomArrayElement(DESCRIPTIONS),
      photos: getRandomArrayOfStrings(PHOTOS),
    },
    location: {
      lat: getRandomFloat(35.65000, 35.70000, 5),
      lng: getRandomFloat(139.70000, 139.80000, 5),
    },
  }
}

const similarAdvertisements = Array.from({length: 10}, createAdvertisement);

console.log(similarAdvertisements);

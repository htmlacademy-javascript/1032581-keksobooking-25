import { checkArrayIsEmpty } from './util.js';

const housingTypeContainer = document.querySelector('#housing-type');
const housingTypeList = Array.from(housingTypeContainer.querySelectorAll('option'));

const getHousingTypeTextValue = (type) => {
  let necessary;
  housingTypeList.forEach((option) => {
    if(option.getAttribute('value') === type) {
      necessary = option.textContent;
    }
  });
  return necessary;
};

const generateAdvertisingMarkup = (advetrtisment) => {
  const cardElementTemplate = document.querySelector('#card')
    .content
    .querySelector('.popup');

  const advetrtismentElement = cardElementTemplate.cloneNode(true);

  const avatarElement = advetrtismentElement.querySelector('.popup__avatar');
  const titleElement = advetrtismentElement.querySelector('.popup__title');
  const addressElement = advetrtismentElement.querySelector('.popup__text--address');
  const priceElement = advetrtismentElement.querySelector('.popup__text--price');
  const typeElement = advetrtismentElement.querySelector('.popup__type');
  const roomsElement = advetrtismentElement.querySelector('.popup__text--capacity');
  const timeElement = advetrtismentElement.querySelector('.popup__text--time');
  const descriptionElement = advetrtismentElement.querySelector('.popup__description');

  const featureList = advetrtismentElement.querySelector('.popup__features');
  const featureListFragment = document.createDocumentFragment();

  const photosContainer = advetrtismentElement.querySelector('.popup__photos');
  const phostosListFragment = document.createDocumentFragment();

  if (advetrtisment.author.avatar) {
    avatarElement.src = advetrtisment.author.avatar;
  } else {
    avatarElement.remove();
  }

  if (advetrtisment.offer.title) {
    titleElement.textContent = advetrtisment.offer.title;
  } else {
    titleElement.remove();
  }

  if (advetrtisment.offer.address) {
    addressElement.textContent = advetrtisment.offer.address;
  } else {
    addressElement.remove();
  }

  if (advetrtisment.offer.price) {
    priceElement.textContent = `${advetrtisment.offer.price} ₽/ночь`;
  } else {
    priceElement.remove();
  }

  if (advetrtisment.offer.type) {
    typeElement.textContent = getHousingTypeTextValue(advetrtisment.offer.type);
  } else {
    typeElement.remove();
  }

  if (advetrtisment.offer.rooms === 0 && advetrtisment.offer.guests === 0) {
    roomsElement.remove();
  } else {
    roomsElement.textContent = `${advetrtisment.offer.rooms} комнаты для ${advetrtisment.offer.guests} гостей`;
  }

  if (advetrtisment.offer.checkin === 0 && advetrtisment.offer.checkout === 0) {
    timeElement.remove();
  } else {
    timeElement.textContent = `Заезд после ${advetrtisment.offer.checkin}, выезд до ${advetrtisment.offer.checkout}`;
  }

  if (checkArrayIsEmpty(advetrtisment.offer.features)) {
    featureList.remove();
  } else {
    advetrtisment.offer.features.forEach((item) => {
      const featureItem = cardElementTemplate.querySelector('.popup__feature').cloneNode();

      featureItem.classList.remove(featureItem.classList[1]);
      featureItem.classList.add(`popup__feature--${item}`);
      featureListFragment.appendChild(featureItem);
    });

    featureList.innerHTML = '';
    featureList.append(featureListFragment);
  }

  if (advetrtisment.offer.description) {
    descriptionElement.textContent = advetrtisment.offer.description;
  } else {
    descriptionElement.remove();
  }

  if (checkArrayIsEmpty(advetrtisment.offer.photos)) {
    photosContainer.remove();
  } else {
    for (const imgSource of advetrtisment.offer.photos) {
      const imageElement = cardElementTemplate.querySelector('.popup__photos img').cloneNode();

      imageElement.src = imgSource;
      phostosListFragment.appendChild(imageElement);
    }
    photosContainer.innerHTML = '';
    photosContainer.append(phostosListFragment);
  }

  return advetrtismentElement;

};

export { generateAdvertisingMarkup };

import {createSimilarAdvertisements} from './create-advertisements.js';

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

const generateAdvertisingMarkup = () => {
  const temporaryCardsContainer = document.querySelector('#map-canvas');
  const cardElementTemplate = document.querySelector('#card')
    .content
    .querySelector('.popup');
  const createAdvetrtisments = createSimilarAdvertisements();
  const advertismentListFragment = document.createDocumentFragment();

  createAdvetrtisments.forEach((advetrtisment) => {
    const advetrtismentElement = cardElementTemplate.cloneNode(true);

    advetrtismentElement.querySelector('.popup__avatar').src = advetrtisment.author.avatar;
    advetrtismentElement.querySelector('.popup__title').textContent = advetrtisment.offer.title;
    advetrtismentElement.querySelector('.popup__text--address').textContent = advetrtisment.offer.address;
    advetrtismentElement.querySelector('.popup__text--price').textContent = `${advetrtisment.offer.price} ₽/ночь`;
    advetrtismentElement.querySelector('.popup__type').textContent = getHousingTypeTextValue(advetrtisment.offer.type);
    advetrtismentElement.querySelector('.popup__text--capacity').textContent = `${advetrtisment.offer.rooms} комнаты для ${advetrtisment.offer.guests} гостей`;
    advetrtismentElement.querySelector('.popup__text--time').textContent = `Заезд после ${advetrtisment.offer.checkin}, выезд до ${advetrtisment.offer.checkout}`;

    const featureElement = advetrtismentElement.querySelector('.popup__features');
    if ([...advetrtisment.offer.features].join(', ')) {
      featureElement.textContent = [...advetrtisment.offer.features].join(', ');
    } else {
      featureElement.remove();
    }

    const descriptionElement = advetrtismentElement.querySelector('.popup__description');
    if(advetrtisment.offer.description) {
      descriptionElement.textContent = advetrtisment.offer.description;
    } else {
      descriptionElement.remove();
    }

    const photosContainer = advetrtismentElement.querySelector('.popup__photos');
    const phostosListFragment = document.createDocumentFragment();
    for (const imgSource of advetrtisment.offer.photos) {
      const imageElement = cardElementTemplate.querySelector('.popup__photos img').cloneNode();
      imageElement.src = imgSource;
      phostosListFragment.appendChild(imageElement);
    }
    photosContainer.innerHTML = '';
    photosContainer.append(phostosListFragment);

    advertismentListFragment.appendChild(advetrtismentElement);
  });

  temporaryCardsContainer.appendChild(advertismentListFragment.querySelector('.popup'));
};

export {generateAdvertisingMarkup};

import {formOptions} from './form-options.js';
import {previewImage} from './image-preview.js';
import {initPriceSlider, resetPriceSlider} from './price-slider.js';
import {sendData} from './load.js';
import {resetFilter} from './filter.js';
import {onSendSuccess, onSendError} from './state.js';
import {setStartPoint} from './map.js';

const form = document.querySelector('.ad-form');
const formFieldsets = form.querySelectorAll('fieldset');
const priceField = form.querySelector('#price');
const defaultPriceValue = priceField.getAttribute('placeholder');
const typeField = form.querySelector('#type');
const roomNumberField = form.querySelector('#room_number');
const roomCapacityField = form.querySelector('#capacity');
const timeInField = form.querySelector('#timein');
const timeOutField = form.querySelector('#timeout');
const submitButton = form.querySelector('.ad-form__submit');
const resetButton = form.querySelector('.ad-form__reset');
const submitButtonDefaultvalue = submitButton.textContent;
const avatarImage = form.querySelector('.ad-form-header__preview img');
const photoImageContainer = form.querySelector('.ad-form__photo');

const DEFAULT_AVATAR_SRC = avatarImage.src;

/* Validation */
const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
});

/* Validation. Price */
const getMinPriceValue = () => formOptions.minPrice[typeField.value];

const changePricePlaceholderValue = () => {
  priceField.setAttribute('placeholder', getMinPriceValue());
};

const returnPriceErrorMessage = () => `Минимум: ${getMinPriceValue()}, максимум: ${formOptions.MAX_PRICE_VALUE}`;

const validatePrice = (value) => value >= getMinPriceValue() && value < formOptions.MAX_PRICE_VALUE;

const onTypeChange = () => {
  pristine.validate(priceField);
  changePricePlaceholderValue();
};

pristine.addValidator (
  priceField,
  validatePrice,
  returnPriceErrorMessage
);

/* Validation. Room capacity */
const validateCapacity = () => formOptions.capacityOptions[roomNumberField.value].includes(roomCapacityField.value);

const returnCapacityErrorMessage = () => {
  const roomNumberFieldSelectedText = roomNumberField.options[roomNumberField.selectedIndex].text;
  const roomNumberFieldValue = formOptions.capacityMessageOptions[roomNumberField.value];

  return `${roomNumberFieldSelectedText} — ${roomNumberFieldValue}`;
};

const onRoomCapacityChange = () => {
  pristine.validate(roomNumberField);
};

pristine.addValidator (
  roomNumberField,
  validateCapacity,
  returnCapacityErrorMessage
);

pristine.addValidator (
  roomCapacityField,
  validateCapacity
);

/* Time fields synchronization */
const onTimeOutChange = () => {
  timeInField.value = timeOutField.value;
};

const onTimeInChange = () => {
  timeOutField.value = timeInField.value;
};

/* Submit button states */
const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Опубликовую...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = submitButtonDefaultvalue;
};

/* Submit form */
const onSubmitForm = (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    blockSubmitButton();
    sendData(
      () => {
        onSendSuccess();
        unblockSubmitButton();
      },
      () => {
        onSendError();
        unblockSubmitButton();
      },
      new FormData(evt.target)
    );
  }
};

const resetImageSrc = () => {
  avatarImage.src = DEFAULT_AVATAR_SRC;

  if (photoImageContainer.childNodes.length) {
    photoImageContainer.innerHTML = '';
  }
};

const resetForm = () => {
  form.reset();
  priceField.setAttribute('placeholder', defaultPriceValue);
  pristine.reset();
  setStartPoint();
  resetImageSrc();
  resetPriceSlider();
};

const onResetButtonClick = () => {
  resetForm();
  resetFilter();
};

/* Events */
const addValidateFormEvents = () => {
  typeField.addEventListener('change', onTypeChange);
  roomCapacityField.addEventListener('change', onRoomCapacityChange);
  timeOutField.addEventListener('change', onTimeOutChange);
  timeInField.addEventListener('change', onTimeInChange);
  form.addEventListener('submit', onSubmitForm);
  resetButton.addEventListener('click', onResetButtonClick);
};

const removeValidateFormEvents = () => {
  typeField.removeEventListener('change', onTypeChange);
  roomCapacityField.removeEventListener('change', onRoomCapacityChange);
  timeOutField.removeEventListener('change', onTimeOutChange);
  timeInField.removeEventListener('change', onTimeInChange);
  form.removeEventListener('submit', onSubmitForm);
  resetButton.removeEventListener('click', onResetButtonClick);
};

/* States */
const deactivateForm = () => {
  form.classList.add('ad-form--disabled');

  for(const fieldset of formFieldsets) {
    fieldset.setAttribute('disabled', '');
  }

  removeValidateFormEvents();
};

const activateForm = () => {
  form.classList.remove('ad-form--disabled');

  for(const fieldset of formFieldsets) {
    fieldset.removeAttribute('disabled');
  }

  initPriceSlider();
  previewImage('avatar', 'ad-form-header__preview');
  previewImage('images', 'ad-form__photo');
  addValidateFormEvents();
};

export {activateForm, deactivateForm, resetForm};
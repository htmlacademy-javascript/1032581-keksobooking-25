import { formOptions } from '../options/form-options.js';
import { createImagePreview } from './image-preview.js';
import { initPriceSlider, resetPriceSlider, deactivateSlider, activateSlider } from './price-slider.js';
import { sendData } from './load.js';
import { resetFilter } from './filter.js';
import { onSendSuccess, onSendError } from './load-state.js';
import { setStartPoint } from './map.js';

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

const onRoomNumberChange = () => {
  pristine.validate(roomCapacityField);
};

pristine.addValidator (
  roomNumberField,
  validateCapacity
);

pristine.addValidator (
  roomCapacityField,
  validateCapacity,
  returnCapacityErrorMessage
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
  submitButton.setAttribute('disabled', '');
  submitButton.classList.add('ad-form--disabled');
  submitButton.textContent = 'Опубликовую...';
};

const unblockSubmitButton = () => {
  submitButton.removeAttribute('disabled');
  submitButton.classList.remove('ad-form--disabled');
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
  pristine.reset();
  resetPriceSlider();
  form.reset();
  priceField.setAttribute('placeholder', defaultPriceValue);
  setStartPoint();
  resetImageSrc();
};

const onResetButtonClick = () => {
  resetForm();
  resetFilter();
};

/* Events */
const addValidateFormEvents = () => {
  typeField.addEventListener('change', onTypeChange);
  roomNumberField.addEventListener('change', onRoomNumberChange);
  timeOutField.addEventListener('change', onTimeOutChange);
  timeInField.addEventListener('change', onTimeInChange);
  form.addEventListener('submit', onSubmitForm);
  resetButton.addEventListener('click', onResetButtonClick);
};

const removeValidateFormEvents = () => {
  typeField.removeEventListener('change', onTypeChange);
  roomNumberField.removeEventListener('change', onRoomNumberChange);
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
  deactivateSlider();
  removeValidateFormEvents();
};

const activateForm = () => {
  form.classList.remove('ad-form--disabled');

  for(const fieldset of formFieldsets) {
    fieldset.removeAttribute('disabled');
  }

  initPriceSlider();
  activateSlider();
  resetForm();
  createImagePreview('avatar', 'ad-form-header__preview');
  createImagePreview('images', 'ad-form__photo');
  addValidateFormEvents();
};

export { activateForm, deactivateForm, resetForm };

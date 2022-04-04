import {formOptions} from './form-options.js';

const form = document.querySelector('.ad-form');
const filterForm = document.querySelector('.map__filters');
const formFieldsets = form.querySelectorAll('fieldset');
const filterFormFieldsets = filterForm.querySelectorAll('fieldset');
const filterFormSelects = filterForm.querySelectorAll('.map__filter');
const priceField = form.querySelector('#price');
const typeField = form.querySelector('#type');
const roomNumberField = form.querySelector('#room_number');
const roomCapacityField = form.querySelector('#capacity');
const timeInField = form.querySelector('#timein');
const timeOutField = form.querySelector('#timeout');

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

/* Submit form */
const submitForm = (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    form.submit();
  }
};

/* Events */
const addValidateFormEvents = () => {
  typeField.addEventListener('change', onTypeChange);
  roomCapacityField.addEventListener('change', onRoomCapacityChange);
  timeOutField.addEventListener('change', onTimeOutChange);
  timeInField.addEventListener('change', onTimeInChange);
  form.addEventListener('submit', submitForm);
};

const removeValidateFormEvents = () => {
  typeField.removeEventListener('change', onTypeChange);
  roomCapacityField.removeEventListener('change', onRoomCapacityChange);
  timeOutField.removeEventListener('change', onTimeOutChange);
  timeInField.removeEventListener('change', onTimeInChange);
  form.removeEventListener('submit', submitForm);
};

/* States */
const toInactiveState = () => {
  form.classList.add('ad-form--disabled');
  filterForm.classList.add('ad-form--disabled');

  for(const fieldset of formFieldsets) {
    fieldset.setAttribute('disabled', '');
  }
  for(const fieldset of filterFormFieldsets) {
    fieldset.setAttribute('disabled', '');
  }
  for(const select of filterFormSelects) {
    select.setAttribute('disabled', '');
  }

  removeValidateFormEvents();
};

const toActiveState = () => {
  form.classList.remove('ad-form--disabled');
  filterForm.classList.remove('ad-form--disabled');

  for(const fieldset of formFieldsets) {
    fieldset.removeAttribute('disabled');
  }
  for(const fieldset of filterFormFieldsets) {
    fieldset.removeAttribute('disabled');
  }
  for(const select of filterFormSelects) {
    select.removeAttribute('disabled', '');
  }

  addValidateFormEvents();
};

export {toInactiveState, toActiveState};

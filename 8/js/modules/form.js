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
};

/* Validation */
const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
});

/* Validation. Price */
const minPrice = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};
const MAX_PRICE_VALUE = 100000;
const getMinPriceValue = () => minPrice[typeField.value];

const changePricePlaceholderValue = () => {
  priceField.setAttribute('placeholder', getMinPriceValue());
};

const returnPriceErrorMessage = () => `Минимум: ${getMinPriceValue()}, максимум: ${MAX_PRICE_VALUE}`;

const validatePrice = (value) => {
  if (value >= getMinPriceValue() && value < MAX_PRICE_VALUE) {
    return true;
  }
  return false;
};

const onTypeChange = (evt) => {
  if (evt.target.nodeName === 'SELECT') {
    pristine.validate(priceField);
    changePricePlaceholderValue();
  }
};

pristine.addValidator(
  priceField,
  validatePrice,
  returnPriceErrorMessage
);

typeField.addEventListener('change', onTypeChange);

/* Validation. Room capacity */
const capacityOption = {
  '1': ['1'],
  '2': ['2', '1'],
  '3': ['3', '2', '1'],
  '100': ['0'],
};
const capacityMessageOption = {
  '1': ['«для 1 гостя»'],
  '2': ['«для 2 гостей» или «для 1 гостя»'],
  '3': ['«для 3 гостей», «для 2 гостей» или «для 1 гостя»'],
  '100': ['«не для гостей»'],
};

const validateCapacity = () => capacityOption[roomNumberField.value].includes(roomCapacityField.value);

const returnCapacityErrorMessage = () => {
  const roomNumberFieldSelectedText = roomNumberField.options[roomNumberField.selectedIndex].text;
  const roomNumberFieldValue = capacityMessageOption[roomNumberField.value];

  return `${roomNumberFieldSelectedText} — ${roomNumberFieldValue}`;
};

pristine.addValidator(
  roomNumberField,
  validateCapacity,
  returnCapacityErrorMessage
);

pristine.addValidator(
  roomCapacityField,
  validateCapacity
);

const onRoomCapacityChange = () => {
  pristine.validate(roomNumberField);
};

roomCapacityField.addEventListener('change', onRoomCapacityChange);

/* Time fields synchronization */
const onTimeOutChange = () => {
  timeInField.value = timeOutField.value;
};
timeOutField.addEventListener('change', onTimeOutChange);

const onTimeInChange = () => {
  timeOutField.value = timeInField.value;
};
timeInField.addEventListener('change', onTimeInChange);

/* Validation. Submit */
form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    form.submit();
  }
});

export {toInactiveState, toActiveState};

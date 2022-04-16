import { formOptions } from './form-options.js';

const sliderOptions = {
  initial: {
    range: {
      min: formOptions.minPrice['flat'],
      max: formOptions.MAX_PRICE_VALUE,
    },
    start: formOptions.minPrice['flat'],
    step: 1,
    connect: 'lower',
    format: {
      to: function (value) {
        return value.toFixed(0);
      },
      from: function (value) {
        return parseFloat(value);
      },
    }
  },
  flat: {
    range: {
      min: formOptions.minPrice['flat'],
      max: formOptions.MAX_PRICE_VALUE,
    },
  },
  bungalow: {
    range: {
      min: formOptions.minPrice['bungalow'],
      max: formOptions.MAX_PRICE_VALUE,
    },
  },
  hotel: {
    range: {
      min: formOptions.minPrice['hotel'],
      max: formOptions.MAX_PRICE_VALUE,
    },
  },
  house: {
    range: {
      min: formOptions.minPrice['house'],
      max: formOptions.MAX_PRICE_VALUE,
    },
  },
  palace: {
    range: {
      min: formOptions.minPrice['palace'],
      max: formOptions.MAX_PRICE_VALUE,
    },
  },
};

export { sliderOptions };

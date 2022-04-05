import {sliderOptions} from './slider-options.js';

const priceSlider = document.querySelector('.ad-form__slider');
const priceField = document.querySelector('#price');
const typeField = document.querySelector('#type');

const initPriceSlider = () => {
  /* Init slider */
  noUiSlider.create(priceSlider, sliderOptions.flat);

  /* Callbacks */
  const onUpdateValue = () => {
    priceField.value = priceSlider.noUiSlider.get();
  };

  const onUpdateTypeOption = () => {
    const currentValue = typeField.value;
    priceSlider.noUiSlider.updateOptions(sliderOptions[currentValue]);
  };

  const onInputChange = () => {
    priceSlider.noUiSlider.set(priceField.value);
  };

  /* Events */
  const initSliderEvents = () => {
    priceSlider.noUiSlider.on('update', onUpdateValue);
    typeField.addEventListener('change', onUpdateTypeOption);
    priceField.addEventListener('blur', onInputChange);
  };

  initSliderEvents();
};

export {initPriceSlider};

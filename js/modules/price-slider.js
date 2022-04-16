import { sliderOptions } from '../options/slider-options.js';

const priceSlider = document.querySelector('.ad-form__slider');
const priceField = document.querySelector('#price');
const typeField = document.querySelector('#type');

/* Create slider */
noUiSlider.create(priceSlider, sliderOptions.initial);

const initPriceSlider = () => {
  /* Callbacks */
  const onSliderUpdate = () => {
    priceField.value = priceSlider.noUiSlider.get();
  };

  const onTypeFieldChange = () => {
    const currentValue = typeField.value;
    priceSlider.noUiSlider.updateOptions(sliderOptions[currentValue]);
  };

  const onPriceFieldBlur = () => {
    priceSlider.noUiSlider.set(priceField.value);
  };

  /* Events */
  const initSliderEvents = () => {
    priceSlider.noUiSlider.on('update', onSliderUpdate);
    typeField.addEventListener('change', onTypeFieldChange);
    priceField.addEventListener('blur', onPriceFieldBlur);
  };

  initSliderEvents();
};

const deactivateSlider = () => {
  priceSlider.setAttribute('disabled', '');
};

const activateSlider = () => {
  priceSlider.removeAttribute('disabled');
};

const resetPriceSlider = () => {
  priceSlider.noUiSlider.set(sliderOptions.initial.start);
};

export { initPriceSlider, resetPriceSlider, deactivateSlider, activateSlider };

const form = document.querySelector('.ad-form');
const filterForm = document.querySelector('.map__filters');
const formFieldsets = form.querySelectorAll('fieldset');
const filterFormFieldsets = filterForm.querySelectorAll('fieldset');

const toInactiveState = () => {
  form.classList.add('ad-form--disabled');
  filterForm.classList.add('ad-form--disabled');

  for(const fieldset of formFieldsets) {
    fieldset.setAttribute('disabled', '');
  }
  for(const fieldset of filterFormFieldsets) {
    fieldset.setAttribute('disabled', '');
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
};

export {toInactiveState, toActiveState};

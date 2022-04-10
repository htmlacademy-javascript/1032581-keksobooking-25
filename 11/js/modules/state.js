import {openModal} from './modal.js';
import {resetForm} from './form.js';
import {setStartPoint} from './map.js';

const onSuccess = () => {
  openModal('success');
  resetForm();
  setStartPoint();
};

const onError = () => {
  openModal('error');
};

export {onSuccess, onError};

import {openModal} from './modal.js';
import {resetForm} from './form.js';

const onSuccess = () => {
  openModal('success');
  resetForm();
};

const onError = () => {
  openModal('error');
};

export {onSuccess, onError};

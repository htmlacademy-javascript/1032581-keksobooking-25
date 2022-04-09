import {openModal} from './modal.js';
import {onResetForm} from './form.js';
import {onStartPoint} from './map.js';

const onSuccess = () => {
  openModal('success');
  onResetForm();
  onStartPoint();
};

const onError = () => {
  openModal('error');
};

export {onSuccess, onError};

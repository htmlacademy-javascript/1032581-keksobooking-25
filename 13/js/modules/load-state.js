import { openModal } from './modal.js';
import { resetForm } from './form.js';

const onSendSuccess = () => {
  openModal('success');
  resetForm();
};

const onSendError = () => {
  openModal('error');
};

export { onSendSuccess, onSendError };

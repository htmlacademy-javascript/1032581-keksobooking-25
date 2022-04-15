const arrayIsEmpty = (array) => array === undefined || array.length === 0;

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.classList.add('alert');
  alertContainer.setAttribute('role', 'alert');

  const alertMessage = document.createElement('p');
  alertMessage.textContent = message;
  alertMessage.classList.add('alert__message');

  const alertCloseButton = document.createElement('button');
  alertCloseButton.value = 'Закрыть сообщение об ошибке';
  alertCloseButton.textContent = '×';
  alertCloseButton.classList.add('alert__close');
  alertCloseButton.addEventListener('click', () => alertContainer.remove());

  alertContainer.append(alertMessage);
  alertContainer.append(alertCloseButton);
  document.body.append(alertContainer);
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {showAlert, arrayIsEmpty, debounce};

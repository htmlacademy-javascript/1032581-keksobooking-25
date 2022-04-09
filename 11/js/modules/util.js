const getRandomInteger = (min, max) => {
  if(min < 0 || max < 0 || max < min || min === max) {
    return false;
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomFloat = (min, max, numberOfSymbolsAfterComma) => {
  if(min < 0 || max < 0 || max < min || min === max) {
    return false;
  }
  return (Math.random() * (max - min) + min).toFixed(numberOfSymbolsAfterComma);
};

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

export {getRandomInteger, getRandomFloat, showAlert};

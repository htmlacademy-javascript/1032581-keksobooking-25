const getData = (onSuccess, onError) => {
  fetch('https://25.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if(response.ok) {
        return response.json();
      }

      throw new Error('Ошибка загрузки кексососедей с сервера');
    })
    .then((advetrtisment) => {
      onSuccess(advetrtisment);
    })
    .catch((err) => {
      onError(err);
    });
};

const sendData = (onSuccess, onError, body) => {
  fetch(
    'https://25.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      contentType: 'multipart/form-data',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        throw new Error();
      }
    })
    .catch(() => {
      onError();
    });
};

export {getData, sendData};

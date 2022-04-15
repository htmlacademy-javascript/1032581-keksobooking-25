const getData = (onGetSuccess, onGetError) => {
  fetch('https://25.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if(response.ok) {
        return response.json();
      }
      throw new Error();
    })
    .then((advetrtisment) => {
      onGetSuccess(advetrtisment);
    })
    .catch(() => {
      onGetError();
    });
};

const sendData = (onSendSuccess, onSendError, body) => {
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
        onSendSuccess();
      } else {
        throw new Error();
      }
    })
    .catch(() => {
      onSendError();
    });
};

export {getData, sendData};

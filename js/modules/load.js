const getData = (onSuccess, onError) => {
  fetch('https://25.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if(response.ok) {
        return response.json();
      }

      throw new Error(`Ошибка загрузки кексососедей с сервера`);
    })
    .then((advetrtisment) => {
      onSuccess(advetrtisment);
    })
    .catch((err) => {
      onError(err);
    });
};

export {getData};

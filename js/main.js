import {showAlert} from './modules/util.js';
import {renderMap} from './modules/map.js';

fetch('https://25.javascript.pages.academy/keksobooking/data1')
  .then((response) => {
    if(response.ok) {
      return response.json();
    }

    throw new Error(`Ошибка загрузки данных с сервера`);
  })
  .then((advetrtisment) => {
    renderMap(advetrtisment);
  })
  .catch((err) => {
    showAlert(err);
  });

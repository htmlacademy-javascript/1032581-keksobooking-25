import {showAlert} from './modules/util.js';
import {getData} from './modules/load.js';
import {renderMap} from './modules/map.js';
import {deactivateFilter} from './modules/filter.js';
import './modules/image-preview.js';

const DATA_ERROR_MESSAGE = 'Ошибка загрузки кексососедей с сервера';

getData(
  renderMap,
  () => {
    showAlert(DATA_ERROR_MESSAGE);
    deactivateFilter();
  }
);

import {showAlert} from './modules/util.js';
import {getData} from './modules/load.js';
import {renderMap} from './modules/map.js';
import {deactivateFilter} from './modules/form.js';

const DATA_ERROR_MESSAGE = 'Ошибка загрузки кексососедей с сервера';

getData(renderMap, () => {
  showAlert(DATA_ERROR_MESSAGE);
  deactivateFilter();
});

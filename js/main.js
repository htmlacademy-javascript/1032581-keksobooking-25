import {showAlert} from './modules/util.js';
import {getData} from './modules/load.js';
import {renderMap} from './modules/map.js';
import {deactivateFilter} from './modules/filter.js';
import './modules/image-preview.js';

const DATA_ERROR_MESSAGE = 'Ошибка загрузки кексососедей с сервера';
const filterForm = document.querySelector('.map__filters');

const getAndRenderData = () => {
  getData(
    renderMap,
    () => {
      showAlert(DATA_ERROR_MESSAGE);
      deactivateFilter();
    }
  );
};

getAndRenderData();

/* TODO: Avoid rerender getData and finf solution to use evt.target.value for the filterData function */

filterForm.addEventListener('change', (evt) => {
  getAndRenderData();
  console.log(evt.target.value);
});

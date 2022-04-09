import {showAlert} from './modules/util.js';
import {getData} from './modules/load.js';
import {renderMap} from './modules/map.js';

getData(renderMap, showAlert);

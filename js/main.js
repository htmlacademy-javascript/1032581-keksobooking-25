import {renderMap} from './modules/map.js';


fetch('https://25.javascript.pages.academy/keksobooking/data')
  .then((response) => response.json())
  .then((advetrtisment) => {
    // console.log(advetrtisment);
    renderMap(advetrtisment);
  });

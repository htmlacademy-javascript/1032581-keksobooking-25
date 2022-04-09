import {getRandomInteger} from './util.js';

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const getRandomArrayOfStrings = (elements, randomNumber) => {
  const randomArray = [];

  for(let i = 0; i < randomNumber; i++){
    randomArray.push(elements[getRandomInteger(0, elements.length - 1)]);
  }

  const uniqueArray = new Set(randomArray);
  Array.from(uniqueArray);

  return uniqueArray;
};

const getArrayOfStrings = (elements) => elements.slice(0, getRandomInteger(1, elements.length - 1));

const arrayIsEmpty = (array) => array === undefined || array.length === 0;

export {getRandomArrayElement, getRandomArrayOfStrings, getArrayOfStrings, arrayIsEmpty};

const getRandomInteger = (min, max) => {
  if(min < 0 || max < 0 || max < min || min === max) {
    return false;
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomFloat = (min, max, numberOfSymbolsAfterComma) => {
  if(min < 0 || max < 0 || max < min || min === max) {
    return false;
  }
  return (Math.random() * (max - min) + min).toFixed(numberOfSymbolsAfterComma);
};

export {getRandomInteger, getRandomFloat};

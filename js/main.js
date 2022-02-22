const getRandomInteger = (min, max) => {
  if(min < 0 || max < 0 || max < min || min === max) {
    return false;
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

getRandomInteger(1, 3);

const getRandomFloat = (min, max, numberOfSymbolsAfterComma) => {
  if(min < 0 || max < 0 || max < min || min === max) {
    return false;
  }
  return (Math.random() * (max - min) + min).toFixed(numberOfSymbolsAfterComma);
};

getRandomFloat(1.1, 1.2, 1);

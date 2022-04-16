const formOptions = {
  MAX_PRICE_VALUE: 100000,
  minPrice: {
    'bungalow': 0,
    'flat': 1000,
    'hotel': 3000,
    'house': 5000,
    'palace': 10000,
  },
  capacityOptions: {
    '1': ['1'],
    '2': ['2', '1'],
    '3': ['3', '2', '1'],
    '100': ['0'],
  },
  capacityMessageOptions: {
    '1': ['«для 1 гостя»'],
    '2': ['«для 2 гостей» или «для 1 гостя»'],
    '3': ['«для 3 гостей», «для 2 гостей» или «для 1 гостя»'],
    '100': ['«не для гостей»'],
  }
};

export { formOptions };

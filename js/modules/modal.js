const openModal = (state) => {
  const elementTemplate = document.querySelector(`#${state}`)
    .content
    .querySelector(`.${state}`);
  const element = elementTemplate.cloneNode(true);
  const onRemoveElement = () => {
    element.remove();
  };

  document.body.append(element);

  element.addEventListener('click', onRemoveElement);
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      onRemoveElement();
    }
  });
};

export {openModal};

const openModal = (state) => {
  const elementTemplate = document.querySelector(`#${state}`)
    .content
    .querySelector(`.${state}`);
  const element = elementTemplate.cloneNode(true);

  document.body.append(element);

  const removeElement = () => {
    element.remove();
  };

  const onElementAreaClick = () => {
    removeElement();
  };

  const onElementAreaKeydown = (evt) => {
    if (evt.key === 'Escape') {
      removeElement();
      document.removeEventListener('keydown', onElementAreaKeydown);
    }
  };

  element.addEventListener('click', onElementAreaClick);
  document.addEventListener('keydown', onElementAreaKeydown);
};

export {openModal};

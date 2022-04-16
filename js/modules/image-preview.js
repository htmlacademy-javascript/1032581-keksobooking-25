const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const createImagePreview = (inputFileID, imageContainerClass) => {
  const fileChooseInput = document.querySelector(`#${inputFileID}`);
  const imageContainer = document.querySelector(`.${imageContainerClass}`);
  const imagePreview = document.querySelector(`.${imageContainerClass} img`);

  fileChooseInput.addEventListener('change', () => {
    const file = fileChooseInput.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((item) => fileName.endsWith(item));

    if (matches) {
      if (imagePreview) {
        imagePreview.src = URL.createObjectURL(file);
      } else {
        imageContainer.innerHTML = '';
        const imageElement = document.createElement('img');
        imageElement.title = fileName;
        imageElement.src = URL.createObjectURL(file);

        imageContainer.append(imageElement);
      }
    }
  });
};

export { createImagePreview };

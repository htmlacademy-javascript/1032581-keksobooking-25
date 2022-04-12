const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const previewImage = (inputFileID, imageContainerClass) => {
  const fileChooseInput = document.querySelector(`#${inputFileID}`);
  const imageContainer = document.querySelector(`.${imageContainerClass}`);
  const imagePreview = document.querySelector(`.${imageContainerClass} img`);

  fileChooseInput.addEventListener('change', () => {
    const file = fileChooseInput.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      if (imagePreview) {
        imagePreview.src = URL.createObjectURL(file);
      } else {
        const imageElement = document.createElement('img');
        imageElement.title = fileName;
        imageElement.src = URL.createObjectURL(file);

        imageContainer.append(imageElement);
      }
    }
  });
};

previewImage('avatar', 'ad-form-header__preview');
previewImage('images', 'ad-form__photo');

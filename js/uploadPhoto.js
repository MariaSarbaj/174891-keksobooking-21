'use strict';

const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];
const PHOTO_SIZE = `70`;

const avatarInput = window.data.adForm.querySelector(`.ad-form__field input[type=file]`);
const avatarPreview = window.data.adForm.querySelector(`.ad-form-header__preview img`);

const photoInput = window.data.adForm.querySelector(`.ad-form__upload input[type=file]`);
const photoWrapper = window.data.adForm.querySelector(`.ad-form__photo`);

const reset = () => {
  avatarPreview.src = `img/muffin-grey.svg`;
  photoWrapper.innerHTML = ``;
};

const choosePhoto = (evt) => {
  const formField = evt.target;
  const chosenPhoto = formField.files[0];
  const chosenPhotoName = chosenPhoto.name.toLowerCase();

  const matches = FILE_TYPES.some((ending) => {
    return chosenPhotoName.endsWith(ending);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener(`load`, () => {
      switch (formField) {
        case avatarInput:
          avatarPreview.src = reader.result;
          break;
        case photoInput:
          const photoPreview = document.createElement(`img`);
          photoPreview.src = reader.result;
          photoPreview.style.maxWidth = `${PHOTO_SIZE}px`;
          photoPreview.style.maxHeight = `${PHOTO_SIZE}px`;
          photoWrapper.appendChild(photoPreview);
          break;
      }
    });

    reader.readAsDataURL(chosenPhoto);
  }
};

const onAvatarInputChange = (evt) => {
  choosePhoto(evt);
};

const onPhotoInputChange = (evt) => {
  choosePhoto(evt);
};

avatarInput.addEventListener(`change`, onAvatarInputChange);
photoInput.addEventListener(`change`, onPhotoInputChange);

window.uploadPhoto = {
  reset,
};

'use strict';

const advertCard = document.querySelector(`#card`).content.querySelector(`.popup`);
const filtersContainer = window.data.map.querySelector(`.map__filters-container`);

const getTypeValue = (type) => {
  switch (type) {
    case `palace`:
      return `Дворец`;
    case `flat`:
      return `Квартира`;
    case `house`:
      return `Дом`;
    case `bungalow`:
      return `Бунгало`;
  }
  return type;
};

const renderAdvertCard = (advert) => {
  const cardContent = advertCard.cloneNode(true);
  const cardTitleField = cardContent.querySelector(`.popup__title`);
  const cardAddressField = cardContent.querySelector(`.popup__text--address`);
  const cardPriceField = cardContent.querySelector(`.popup__text--price`);
  const cardTypeField = cardContent.querySelector(`.popup__type`);
  const cardCapacityField = cardContent.querySelector(`.popup__text--capacity`);
  const cardTimeField = cardContent.querySelector(`.popup__text--time`);
  const cardFeaturesList = cardContent.querySelector(`.popup__features`);
  const cardDescriptionField = cardContent.querySelector(`.popup__description`);
  const cardPhotosField = cardContent.querySelector(`.popup__photos`);
  const cardPhotoItem = cardContent.querySelector(`.popup__photo`);
  const cardAuthorAvatar = cardContent.querySelector(`.popup__avatar`);
  const closePopup = cardContent.querySelector(`.popup__close`);

  if (advert.offer.title) {
    cardTitleField.textContent = advert.offer.title;
  } else {
    cardTitleField.remove();
  }

  if (advert.offer.address) {
    cardAddressField.textContent = advert.offer.address;
  } else {
    cardAddressField.remove();
  }

  if (advert.offer.price) {
    cardPriceField.textContent = `${advert.offer.price}₽/ночь`;
  } else {
    cardPriceField.remove();
  }

  if (advert.offer.type) {
    cardTypeField.textContent = getTypeValue(advert.offer.type);
  } else {
    cardTypeField.remove();
  }

  if (advert.offer.rooms && advert.offer.guests) {
    cardCapacityField.textContent = `${advert.offer.rooms} комнаты для ${advert.offer.guests} гостей`;
  } else {
    cardCapacityField.remove();
  }

  if (advert.offer.checkin && advert.offer.checkout) {
    cardTimeField.textContent = `Заезд после ${advert.offer.checkin}, выезд до ${advert.offer.checkout}`;
  } else {
    cardTimeField.remove();
  }

  cardFeaturesList.innerHTML = ``;
  if (advert.offer.features) {
    const fragment = document.createDocumentFragment();
    advert.offer.features.forEach((feature) => {
      const featureItem = document.createElement(`li`);
      featureItem.className = `popup__feature popup__feature--${feature}`;
      fragment.appendChild(featureItem);
    });
    cardFeaturesList.appendChild(fragment);
  }

  if (advert.offer.description) {
    cardDescriptionField.textContent = advert.offer.description;
  } else {
    cardDescriptionField.remove();
  }

  if (advert.offer.photos) {
    advert.offer.photos.forEach((photo) => {
      const photoItem = cardPhotoItem.cloneNode(true);
      photoItem.src = photo;
      cardPhotosField.appendChild(photoItem);
    });
  }

  cardPhotosField.removeChild(cardPhotoItem);

  if (advert.author.avatar) {
    cardAuthorAvatar.src = advert.author.avatar;
  } else {
    cardAuthorAvatar.remove();
  }

  document.addEventListener(`keydown`, onClosePopupEscapeKeydown);
  closePopup.addEventListener(`click`, onClosePopupClick);

  return cardContent;
};

const onClosePopupClick = (evt) => {
  if (!evt.button) {
    closePopup();
  }
};

const onClosePopupEscapeKeydown = (evt) => {
  if (evt.key === window.data.ESCAPE_BUTTON) {
    closePopup();
  }
};

const closePopup = () => {
  window.pin.removeActive();
  window.map.clearCard();
};

const createCard = (item) => {
  window.data.map.insertBefore(renderAdvertCard(item), filtersContainer);
};

window.card = {
  create: createCard,
  onClosePopupEscapeKeydown,
};

'use strict';

(() => {
  // Activate Map & Filling address input

  const adFormElements = window.data.adForm.querySelectorAll(`fieldset`);
  const addressInput = window.data.adForm.querySelector(`#address`);
  const adFormSubmitButton = window.data.adForm.querySelector(`.ad-form__submit`);

  const onMapPinMainMousedown = (evt) => {
    if (!evt.button) {
      activateMap();
    }
  };

  const onMapPinMainEnterKeydown = (evt) => {
    if (evt.key === window.data.ENTER_BUTTON) {
      activateMap();
    }
  };

  const pinMainInitialPosition = {
    x: Math.floor(window.data.InitialPinPosition.X + window.data.PinRoundSize.WIDTH / 2),
    y: Math.floor(window.data.InitialPinPosition.Y + window.data.PinRoundSize.HEIGHT / 2)
  };

  const setActivateState = () => {
    window.data.map.classList.remove(`map--faded`);
    window.data.adForm.classList.remove(`ad-form--disabled`);
    window.backend(null, window.onLoadSuccessHandler.onLoadSuccess, window.utils.onLoadError, window.data.Method.GET, window.data.URL_LOAD);
    adFormElements.forEach((item) => {
      item.disabled = false;
    });
    window.form.setAddress(window.pin.getLocation());
    adFormSubmitButton.style.pointerEvents = `auto`;
  };

  const activateMap = () => {
    setActivateState();
    window.data.mapPinMain.removeEventListener(`mousedown`, onMapPinMainMousedown);
    window.data.mapPinMain.removeEventListener(`keydown`, onMapPinMainEnterKeydown);
  };

  window.data.mapPinMain.addEventListener(`mousedown`, onMapPinMainMousedown);
  window.data.mapPinMain.addEventListener(`keydown`, onMapPinMainEnterKeydown);

  /* Удалить метки */
  const clearPins = () => {
    const pinsToClear = document.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    pinsToClear.forEach((item) => {
      item.remove();
    });
  };

  const clearCard = () => {
    const cardToClear = window.data.map.querySelector(`.map__card`);
    if (cardToClear) {
      window.data.map.removeChild(cardToClear);
    }
  };

  const setInactivateState = () => {
    window.data.map.classList.add(`map--faded`);
    window.data.adForm.classList.add(`ad-form--disabled`);
    adFormElements.forEach((item) => {
      item.disabled = true;
    });
    window.data.filterFormElements.forEach((item) => {
      item.disabled = true;
    });
    addressInput.value = `${pinMainInitialPosition.x}, ${pinMainInitialPosition.y}`;
    clearPins();
    clearCard();
    adFormSubmitButton.style.pointerEvents = `none`;
    window.data.mapPinMain.addEventListener(`mousedown`, onMapPinMainMousedown);
    window.data.mapPinMain.addEventListener(`keydown`, onMapPinMainEnterKeydown);
  };

  if (window.data.map.classList.contains(`map--faded`)) {
    setInactivateState();
  }

  window.map = {
    clearPins,
    clearCard,
    activate: activateMap,
    inactivate: setInactivateState
  };

})();

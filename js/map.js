'use strict';

(() => {
  // Activate Map & Filling address input

  const mapFilters = document.querySelector(`.map__filters`);
  const adFormFieldsets = window.data.adForm.querySelectorAll(`fieldset`);
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
    window.backend(null, window.loader.onLoadSuccess, window.utils.onLoadError, window.data.Method.GET, window.data.URL_LOAD);
    adFormFieldsets.forEach((item) => {
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
    const pinsList = document.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    pinsList.forEach((item) => {
      item.remove();
    });
  };

  const clearCard = () => {
    const card = window.data.map.querySelector(`.map__card`);
    if (card) {
      window.data.map.removeChild(card);
    }
  };

  const setInactivateState = () => {
    window.data.map.classList.add(`map--faded`);
    window.data.adForm.classList.add(`ad-form--disabled`);
    adFormFieldsets.forEach((item) => {
      item.disabled = true;
    });
    mapFilters.reset();
    window.data.filterFormElements.forEach((item) => {
      item.disabled = true;
    });
    window.data.mapPinMain.style.left = `${window.data.InitialPinPosition.X}px`;
    window.data.mapPinMain.style.top = `${window.data.InitialPinPosition.Y}px`;
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

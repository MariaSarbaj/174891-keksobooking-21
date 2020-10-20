'use strict';

(() => {
  // Activate Map & Filling address input

  const adFormElements = window.data.adForm.querySelectorAll(`fieldset`);
  const addressInput = window.data.adForm.querySelector(`#address`);

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

  const pinMainPosition = {
    x: Math.floor(window.data.InitialPinPosition.X + window.data.PinRoundSize.WIDTH / 2),
    y: Math.floor(window.data.InitialPinPosition.Y + window.data.PinRoundSize.HEIGHT + window.data.PinEdgeSize.HEIGHT)
  };


  const setActivateState = () => {
    window.data.map.classList.remove(`map--faded`);
    window.data.adForm.classList.remove(`ad-form--disabled`);
    window.load(window.loadHandler.onLoadSuccess, window.loadHandler.onLoadError);
    adFormElements.forEach((item) => {
      item.disabled = false;
    });
    addressInput.value = `${pinMainPosition.x}, ${pinMainPosition.y}`;
  };

  if (window.data.map.classList.contains(`map--faded`)) {
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
    };
    setInactivateState();
  }

  const activateMap = () => {
    setActivateState();
    window.data.mapPinMain.removeEventListener(`mousedown`, onMapPinMainMousedown);
    window.data.mapPinMain.removeEventListener(`keydown`, onMapPinMainEnterKeydown);
  };

  window.data.mapPinMain.addEventListener(`mousedown`, onMapPinMainMousedown);
  window.data.mapPinMain.addEventListener(`keydown`, onMapPinMainEnterKeydown);
})();

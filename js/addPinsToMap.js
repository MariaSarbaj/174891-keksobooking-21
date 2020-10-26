'use strict';

(() => {

  const mapPins = document.querySelector(`.map__pins`);

  window.addPinsToMap = {
    renderAdverts: (adverts) => {
      const pinsNumber = adverts.length > window.data.MAX_PIN_QUANTITY ? window.data.MAX_PIN_QUANTITY : adverts.length;
      const fragment = document.createDocumentFragment();
      for (let i = 0; i < pinsNumber; i++) {
        if (adverts[i].offer) {
          fragment.appendChild(window.pin.renderPin(adverts[i]));
        }
      }
      mapPins.appendChild(fragment);
    },
  };
})();


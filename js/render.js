'use strict';

const mapPins = document.querySelector(`.map__pins`);

window.render = {
  addPinsToMap: (adverts) => {
    const pinsNumber = adverts.length > window.data.MAX_PIN_QUANTITY ? window.data.MAX_PIN_QUANTITY : adverts.length;
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < pinsNumber; i++) {
      const advert = adverts[i];

      if (advert.offer) {
        fragment.appendChild(window.pin.render(advert));
      }
    }
    mapPins.appendChild(fragment);
  },
};

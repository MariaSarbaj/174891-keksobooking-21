'use strict';

(() => {
  // Constants

  const mapFilters = document.querySelector(`.map__filters`);

  window.data = {
    PinSize: {
      WIDTH: 50,
      HEIGHT: 70
    },

    InitialPinPosition: {
      X: 570,
      Y: 375
    },

    PinRoundSize: {
      WIDTH: 65,
      HEIGHT: 65
    },

    PinEdgeSize: {
      HEIGHT: 22
    },

    DragLimit: {
      Y: {
        MIN: 130,
        MAX: 630
      }
    },

    ENTER_BUTTON: `Enter`,
    ESCAPE_BUTTON: `Escape`,

    MAX_PIN_QUANTITY: 5,

    URL_LOAD: `https://21.javascript.pages.academy/keksobooking/data`,
    TIMEOUT: 10000,

    TYPE_ANY: `any`,

    map: document.querySelector(`.map`),
    mapPinMain: document.querySelector(`.map__pin--main`),
    adForm: document.querySelector(`.ad-form`),
    filterFormElements: mapFilters.querySelectorAll(`select, fieldset`)
  };

})();

'use strict';

(() => {
  // Constants

  const mapFilters = document.querySelector(`.map__filters`);
  const mapPinsArea = document.querySelector(`.map__pins`);

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
    URL_POST: `https://21.javascript.pages.academy/keksobooking`,
    TIMEOUT: 10000,

    Code: {
      SUCCESS: 200,
      REQUEST_ERROR: 400,
      NOT_USER_ERROR: 401,
      NOT_FOUND_ERROR: 404
    },

    TYPE_ANY: `any`,

    CORRECTION_FACTOR: 1,

    Method: {
      GET: `GET`,
      POST: `POST`
    },

    MIN_PRICE: `1000`,

    map: document.querySelector(`.map`),
    mapPinMain: document.querySelector(`.map__pin--main`),
    mapPinsAreaWidth: mapPinsArea.offsetWidth,
    adForm: document.querySelector(`.ad-form`),
    filterFormElements: mapFilters.querySelectorAll(`select, fieldset`)
  };

})();

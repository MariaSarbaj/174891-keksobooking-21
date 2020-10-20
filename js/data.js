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

    ENTER_BUTTON: `Enter`,

    URL_LOAD: `https://21.javascript.pages.academy/keksobooking/data`,
    TIMEOUT: 10000,

    map: document.querySelector(`.map`),
    mapPinMain: document.querySelector(`.map__pin--main`),
    adForm: document.querySelector(`.ad-form`),
    filterFormElements: mapFilters.querySelectorAll(`select, fieldset`)


  };

})();

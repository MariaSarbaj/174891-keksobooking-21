'use strict';

(() => {
  // Constants

  window.data = {
    ADVERTISEMENT_QUANTITY: 8,
    TITLES: [`Большая уютная квартира`, `Маленькая неуютная квартира`, `Огромный прекрасный дворец`, `Маленький ужасный дворец`, `Красивый гостевой домик`, `Некрасивый негостеприимный домик`, `Уютное бунгало далеко от моря`, `Неуютное бунгало по колено в воде`],
    AddressX: {
      MIN: 0,
      MAX: 1200
    },
    AddressY: {
      MIN: 130,
      MAX: 630
    },
    Price: {
      MIN: 1000,
      MAX: 1000000
    },
    TYPES: [`palace`, `flat`, `house`, `bungalow`],
    Room: {
      MIN: 1,
      MAX: 5
    },
    Guest: {
      MIN: 1,
      MAX: 30
    },
    CHECKIN_TIMES: [`12:00`, `13:00`, `14:00`],
    CHECKOUT_TIMES: [`12:00`, `13:00`, `14:00`],
    FEATURES: [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`],
    DESCRIPTION: ``,
    PHOTOS: [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`],

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

    AVATAR_NUMBERS: [1, 2, 3, 4, 5, 6, 7, 8],

    ENTER_BUTTON: `Enter`,

    map: document.querySelector(`.map`),
    mapPinMain: document.querySelector(`.map__pin--main`),
    adForm: document.querySelector(`.ad-form`),
    mapFilters: document.querySelector(`.map__filters`),
  };

})();

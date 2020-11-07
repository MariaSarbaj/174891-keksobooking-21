'use strict';

(() => {
  const TYPE_MIDDLE = `middle`;
  const TYPE_LOW = `low`;
  const TYPE_HIGH = `high`;
  const LOW_PRICE = 10000;
  const HIGH_PRICE = 50000;

  const mapFilters = document.querySelector(`.map__filters`);
  const housingType = mapFilters.querySelector(`#housing-type`);
  const housingPrice = mapFilters.querySelector(`#housing-price`);
  const housingRooms = mapFilters.querySelector(`#housing-rooms`);
  const housingGuests = mapFilters.querySelector(`#housing-guests`);

  const checkHousingType = (advert) => {
    return advert.offer.type === housingType.value || housingType.value === window.data.TYPE_ANY;
  };

  const checkHousingPrice = (advert) => {
    switch (housingPrice.value) {
      case TYPE_MIDDLE:
        return advert.offer.price >= LOW_PRICE && advert.offer.price <= HIGH_PRICE;
      case TYPE_LOW:
        return advert.offer.price < LOW_PRICE;
      case TYPE_HIGH:
        return advert.offer.price >= HIGH_PRICE;
    }
    return true;
  };

  const checkHousingRooms = (advert) => {
    return advert.offer.rooms >= housingRooms.value || housingRooms.value === window.data.TYPE_ANY;
  };

  const checkHousingGuests = (advert) => {
    return advert.offer.guests >= housingGuests.value || housingGuests.value === window.data.TYPE_ANY;
  };

  const checkHousingFeatures = (advert, features) => {
    return features.every((value) => {
      return advert.offer.features.includes(value);
    });
  };

  const checkFilters = (advert) => {
    return checkHousingType(advert)
      && checkHousingPrice(advert)
      && checkHousingRooms(advert)
      && checkHousingGuests(advert);
  };

  /* Провести фильтрацию */

  const get5Adverts = (receivedAdverts, quantity) => {
    const filteredAdverts = [];

    const housingFeatures = mapFilters.querySelectorAll(`.map__checkbox:checked`);
    const features = [];

    housingFeatures.forEach((feature) => {
      features.push(feature.value);
    });

    for (let i = 0; i < receivedAdverts.length; i++) {
      if (checkFilters(receivedAdverts[i]) && checkHousingFeatures(receivedAdverts[i], features)) {
        filteredAdverts.push(receivedAdverts[i]);

        if (filteredAdverts.length >= quantity) {
          break;
        }
      }
    }
    return filteredAdverts;
  };

  const renderFilteredAdverts = () => {
    window.map.clearPins();
    window.map.clearCard();
    const updateAdverts = get5Adverts(window.loader.receivedAdverts, window.data.MAX_PIN_QUANTITY);
    window.render.addPinsToMap(updateAdverts);
  };

  window.filter = {
    activateSelectionForm: () => {
      mapFilters.addEventListener(`change`, () => {
        window.debounce(() => {
          renderFilteredAdverts();
        });
      });
    }
  };
})();


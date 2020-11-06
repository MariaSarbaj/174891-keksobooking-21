'use strict';

(() => {

  const mapFilters = document.querySelector(`.map__filters`);
  const housingType = mapFilters.querySelector(`#housing-type`);

  /* Провести фильтрацию */

  const get5Adverts = (receivedAdverts, filter, quantity) => {
    const filteredAdverts = [];

    for (let i = 0; i < receivedAdverts.length; i++) {
      if (receivedAdverts[i].offer.type === filter || filter === window.data.TYPE_ANY) {
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
    const updateAdverts = get5Adverts(window.loader.receivedAdverts, housingType.value, window.data.MAX_PIN_QUANTITY);
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


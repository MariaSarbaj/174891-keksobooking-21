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
    window.map.clearPinsAndCard();
    const updateAdverts = get5Adverts(window.onLoadSuccessHandler.receivedAdverts, housingType.value, window.data.MAX_PIN_QUANTITY);
    window.addPinsToMap.renderAdverts(updateAdverts);
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


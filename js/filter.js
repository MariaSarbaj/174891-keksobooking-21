'use strict';

(() => {

  const mapFilters = document.querySelector(`.map__filters`);
  const housingType = mapFilters.querySelector(`#housing-type`);
  const mapPins = document.querySelector(`.map__pins`);

  /* Провести фильтрацию */

  let filteredAdverts = [];

  const get5Adverts = (array, filter, quantity, newArray) => {
    newArray = [];

    for (let i = 0; i < array.length; i++) {
      if (array[i].offer.type === filter || filter === window.data.TYPE_ANY) {
        newArray.push(array[i]);

        if (newArray.length >= quantity) {
          break;
        }
      }
    }
    return newArray;
  };

  const onFilterChange = () => {
    window.utils.clearMap();
    let updateAdverts = get5Adverts(window.pin.receivedAdverts, housingType.value, window.data.MAX_PIN_QUANTITY, filteredAdverts);
    window.filter.renderAdverts(updateAdverts);
  };

  window.filter = {
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

    activateSelectionForm: () => {
      mapFilters.addEventListener(`change`, () => {
        window.debounce(() => {
          onFilterChange();
        });
      });
    }
  };
})();


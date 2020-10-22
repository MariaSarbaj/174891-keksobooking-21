'use strict';

(() => {

  const mapFilters = document.querySelector(`.map__filters`);
  const housingType = mapFilters.querySelector(`#housing-type`);

  let filteredAdverts = [];

  /* Удалить метки */

  const getClearMap = () => {
    const clearPins = Array.from(document.querySelectorAll(`.map__pin:not(.map__pin--main)`));
    clearPins.forEach((item) => {
      item.remove();
    });

    const clearCard = window.data.map.querySelector(`.map__card`);
    if (clearCard) {
      window.data.map.removeChild(clearCard);
    }
  };

  /* Провести фильтрацию */

  const filtrationItem = (it, item, key) => {
    return it.value === `any` ? true : it.value === item[key].toString();
  };

  const filtrationByType = (item) => {
    return filtrationItem(housingType, item.offer, `type`);
  };

  const activateFilter = () => {
    const onFilterChange = () => {
      getClearMap();
      filteredAdverts = window.loadHandler.advertsList.filter(filtrationByType);
      window.pin.renderPins(filteredAdverts);
    };

    mapFilters.addEventListener(`change`, () => {
      window.debounce(() => {
        onFilterChange();
      });
    });
  };

  window.filter = {
    activateFilter
  };
})();


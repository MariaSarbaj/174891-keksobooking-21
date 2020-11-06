'use strict';

(() => {

  window.loader = {
    onLoadSuccess: (adverts) => {
      window.loader.receivedAdverts = adverts;
      window.render.addPinsToMap(adverts);
      window.filter.activateSelectionForm();
      window.data.filterFormElements.forEach((item) => {
        item.disabled = false;
      });
    },

    receivedAdverts: [],
  };
})();

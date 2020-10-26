'use strict';

(() => {

  window.onLoadSuccessHandler = {
    onLoadSuccess: (adverts) => {
      window.onLoadSuccessHandler.receivedAdverts = adverts;
      window.addPinsToMap.renderAdverts(adverts);
      window.filter.activateSelectionForm();
      window.data.filterFormElements.forEach((item) => {
        item.disabled = false;
      });
    },

    receivedAdverts: [],
  };
})();

'use strict';

(() => {
  window.loadHandler = {
    onLoadSuccess: (adverts) => {
      window.loadHandler.advertsList = adverts;
      window.pin.renderPins(adverts);
      window.filter.activateFilter();
    },

    onLoadError: (message) => {
      const errorMessage = document.createElement(`div`);
      const style = errorMessage.style;
      errorMessage.textContent = message;
      style.width = `100vw`;
      style.height = `10vh`;
      style.fontSize = `6vh`;
      style.fontFamily = `Roboto`;
      style.color = `rgb(255, 255, 255)`;
      style.backgroundColor = `rgba(246, 95, 63, 0.7)`;
      style.position = `fixed`;
      style.zIndex = `1000`;
      style.display = `flex`;
      style.justifyContent = `center`;
      style.alignItems = `center`;
      style.top = `0`;
      style.left = `0`;
      document.body.appendChild(errorMessage);
    },

    advertsList: [],
  };
})();

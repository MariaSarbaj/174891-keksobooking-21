'use strict';

(() => {

  window.loadHandler = {
    onLoadSuccess: (advertisements) => {
      window.pin.renderPins(advertisements);
    },

    onLoadError: (message) => {
      const errorMessage = document.createElement(`div`);
      errorMessage.textContent = message;
      errorMessage.style.width = `100vw`;
      errorMessage.style.height = `10vh`;
      errorMessage.style.fontSize = `6vh`;
      errorMessage.style.fontFamily = `Roboto`;
      errorMessage.style.color = `rgb(255, 255, 255)`;
      errorMessage.style.backgroundColor = `rgba(246, 95, 63, 0.7)`;
      errorMessage.style.position = `fixed`;
      errorMessage.style.zIndex = `1000`;
      errorMessage.style.display = `flex`;
      errorMessage.style.justifyContent = `center`;
      errorMessage.style.alignItems = `center`;
      errorMessage.style.top = `0`;
      errorMessage.style.left = `0`;
      document.body.appendChild(errorMessage);
    },
  };
})();

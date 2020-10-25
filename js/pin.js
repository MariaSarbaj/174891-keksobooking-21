'use strict';

(() => {
  // Generate Ads
  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

  const calculatePinContentLeft = (advert) => {
    return advert.location.x - window.data.PinSize.WIDTH / 2;
  };

  const calculatePinContentTop = (advert) => {
    return advert.location.y - window.data.PinSize.HEIGHT;
  };

  window.pin = {
    onLoadSuccess: (adverts) => {
      window.pin.receivedAdverts = adverts;
      window.filter.renderAdverts(adverts);
      window.filter.activateSelectionForm();
      window.data.filterFormElements.forEach((item) => {
        item.disabled = false;
      });
    },

    renderPin: (advert) => {
      const pinContent = pinTemplate.cloneNode(true);
      const img = pinContent.querySelector(`img`);
      pinContent.style.left = `${calculatePinContentLeft(advert)}px`;
      pinContent.style.top = `${calculatePinContentTop(advert)}px`;
      img.src = advert.author.avatar;
      img.alt = advert.offer.title;
      return pinContent;
    },

    receivedAdverts: [],
  };
})();

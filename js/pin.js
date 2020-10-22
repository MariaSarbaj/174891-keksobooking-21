'use strict';

(() => {
  // Generate Ads
  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const mapPins = document.querySelector(`.map__pins`);

  const calculatePinContentLeft = (advert) => {
    return advert.location.x - window.data.PinSize.WIDTH / 2;
  };

  const calculatePinContentTop = (advert) => {
    return advert.location.y - window.data.PinSize.HEIGHT;
  };

  const renderPin = (advert) => {
    const pinContent = pinTemplate.cloneNode(true);
    const img = pinContent.querySelector(`img`);
    pinContent.style.left = `${calculatePinContentLeft(advert)}px`;
    pinContent.style.top = `${calculatePinContentTop(advert)}px`;
    img.src = advert.author.avatar;
    img.alt = advert.offer.title;
    return pinContent;
  };

  window.pin = {
    renderPins: (adverts) => {
      const fragment = document.createDocumentFragment();
      adverts.slice(0, window.data.MAX_PIN_QUANTITY).forEach((item) => {
        if (item.offer) {
          fragment.appendChild(renderPin(item));
        }
      });

      mapPins.appendChild(fragment);

      window.data.filterFormElements.forEach((item) => {
        item.disabled = false;
      });
    }
  };
})();

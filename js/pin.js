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

  const renderPin = (advertisement) => {
    const pinContent = pinTemplate.cloneNode(true);
    const img = pinContent.querySelector(`img`);
    pinContent.style.left = `${calculatePinContentLeft(advertisement)}px`;
    pinContent.style.top = `${calculatePinContentTop(advertisement)}px`;
    img.src = advertisement.author.avatar;
    img.alt = advertisement.offer.title;
    return pinContent;
  };

  window.pin = {
    renderPins: (advertisements) => {
      const fragment = document.createDocumentFragment();
      advertisements.forEach((item) => {
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

'use strict';

// Generate Ads
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

const calculatePinContentLeft = (advert) => {
  return advert.location.x - window.data.PinSize.WIDTH / 2;
};

const calculatePinContentTop = (advert) => {
  return advert.location.y - window.data.PinSize.HEIGHT;
};

const removePinActive = () => {
  const activePin = window.data.map.querySelector(`.map__pin--active`);

  if (activePin) {
    activePin.classList.remove(`map__pin--active`);
  }
};

const getMainPinLocation = () => {
  const location = {
    x: Math.floor(window.data.mapPinMain.offsetLeft + window.data.mapPinMain.offsetWidth / 2),
    y: Math.floor(window.data.mapPinMain.offsetTop + window.data.mapPinMain.offsetHeight + window.data.PinEdgeSize.HEIGHT)
  };

  return location;
};

window.pin = {
  render: (advert) => {
    const pinContent = pinTemplate.cloneNode(true);
    const img = pinContent.querySelector(`img`);
    pinContent.style.left = `${calculatePinContentLeft(advert)}px`;
    pinContent.style.top = `${calculatePinContentTop(advert)}px`;
    img.src = advert.author.avatar;
    img.alt = advert.offer.title;

    pinContent.addEventListener(`click`, () => {
      removePinActive();
      pinContent.classList.add(`map__pin--active`);
      window.map.clearCard();
      window.card.create(advert);
    });

    return pinContent;
  },

  removeActive: removePinActive,

  getLocation: getMainPinLocation
};

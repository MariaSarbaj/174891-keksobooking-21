'use strict';

(() => {
  // Generate Ads
  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const mapPins = document.querySelector(`.map__pins`);

  let randomAdvertisements = [];

  const onLoadSuccess = (adverts) => {
    randomAdvertisements = adverts;
  };

  const onLoadError = (message) => {
    const errorMessage = document.createElement(`div`);
    errorMessage.textContent = message;
    errorMessage.style.width = `100vw`;
    errorMessage.style.height = `100vh`;
    errorMessage.style.fontSize = `10vh`;
    errorMessage.style.fontFamily = `Roboto`;
    errorMessage.style.color = `#F65F3F`;
    errorMessage.style.backgroundColor = `rgba(255, 255, 255, 0.7)`;
    errorMessage.style.position = `fixed`;
    errorMessage.style.zIndex = `1000`;
    errorMessage.style.display = `flex`;
    errorMessage.style.justifyContent = `center`;
    errorMessage.style.alignItems = `center`;
    errorMessage.style.top = `50%`;
    errorMessage.style.left = `50%`;
    errorMessage.style.transform = `translate(-50%, -50%)`;
    document.body.appendChild(errorMessage);
  };

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

  window.load(onLoadSuccess, onLoadError);

  window.card = {
    fillFragment: () => {
      const fragment = document.createDocumentFragment();

      randomAdvertisements.forEach((item) => {
        fragment.appendChild(renderPin(item));
      });

      mapPins.appendChild(fragment);
    }
  };
})();

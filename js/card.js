'use strict';

(() => {
  // Generate Ads

  const avatars = [];

  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const mapPins = document.querySelector(`.map__pins`);

  const getAvatarLinksList = () => {

    const shuffleNumbers = (numbers) => {
      for (let i = numbers.length - 1; i > 0; i--) {
        const randomItem = Math.floor(Math.random() * (i + 1));
        const temp = numbers[randomItem];
        numbers[randomItem] = numbers[i];
        numbers[i] = temp;
      }

      return window.data.AVATAR_NUMBERS;
    };

    shuffleNumbers(window.data.AVATAR_NUMBERS);

    for (let i = 0; i < window.data.ADVERTISEMENT_QUANTITY; i++) {
      const randomAvatarLink = `img/avatars/user0${window.data.AVATAR_NUMBERS[i]}.png`;

      avatars.push(randomAvatarLink);
    }

    return avatars;
  };

  getAvatarLinksList();

  const randomAdvertisements = [];

  const getRandomAdvertisement = () => {
    const getRandomString = (items) => {
      return items[Math.floor(Math.random() * items.length)];
    };

    const getRandomNumber = (min, max) => {
      return Math.floor(Math.random() * (max - min) + min);
    };

    const existFeatures = window.data.FEATURES.slice(Math.floor(Math.random() * window.data.FEATURES.length));

    const attachedPhotos = window.data.PHOTOS.slice(Math.floor(Math.random() * window.data.PHOTOS.length));

    for (let i = 0; i < window.data.ADVERTISEMENT_QUANTITY; i++) {
      const randomAdvertisement = {
        author: {
          avatar: avatars[i]
        },
        offer: {
          title: getRandomString(window.data.TITLES),
          address: ``,
          price: getRandomNumber(window.data.Price.MIN, window.data.Price.MAX),
          type: getRandomString(window.data.TYPES),
          rooms: getRandomNumber(window.data.Room.MIN, window.data.Room.MAX),
          guests: getRandomNumber(window.data.Guest.MIN, window.data.Guest.MAX),
          checkin: getRandomString(window.data.CHECKIN_TIMES),
          checkout: getRandomString(window.data.CHECKOUT_TIMES),
          features: existFeatures,
          description: window.data.DESCRIPTION,
          photos: attachedPhotos
        },
        location: {
          x: getRandomNumber(window.data.AddressX.MIN, window.data.AddressX.MAX),
          y: getRandomNumber(window.data.AddressY.MIN, window.data.AddressY.MAX)
        }
      };

      randomAdvertisement.offer.address = `${randomAdvertisement.location.x}, ${randomAdvertisement.location.y}`;

      randomAdvertisements.push((randomAdvertisement));
    }

    return randomAdvertisements;
  };

  getRandomAdvertisement();

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

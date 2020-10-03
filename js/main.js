'use strict';

// Constants

const ADVERTISEMENT_QUANTITY = 8;
const TITLES = [`Большая уютная квартира`, `Маленькая неуютная квартира`, `Огромный прекрасный дворец`, `Маленький ужасный дворец`, `Красивый гостевой домик`, `Некрасивый негостеприимный домик`, `Уютное бунгало далеко от моря`, `Неуютное бунгало по колено в воде`];
const AddressX = {
  MIN: 0,
  MAX: 1200
};
const AddressY = {
  MIN: 130,
  MAX: 630
};
const Price = {
  MIN: 1000,
  MAX: 1000000
};
const TYPES = [`palace`, `flat`, `house`, `bungalow`];
const Room = {
  MIN: 1,
  MAX: 5
};
const Guest = {
  MIN: 1,
  MAX: 30
};
const CHECKIN_TIMES = [`12:00`, `13:00`, `14:00`];
const CHECKOUT_TIMES = [`12:00`, `13:00`, `14:00`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const DESCRIPTION = ``;
const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];

const PinSize = {
  WIDTH: 50,
  HEIGHT: 70
};

const InitialPinPosition = {
  X: 570,
  Y: 375
};

const PinRoundSize = {
  WIDTH: 62,
  HEIGHT: 62
};

const PinEdgeSize = {
  WIDTH: 10,
  HEIGHT: 22
};

const AVATAR_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8];

const ENTER_BUTTON = `Enter`;


// Generate Ads

const avatars = [];

const map = document.querySelector(`.map`);
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

    return AVATAR_NUMBERS;
  };

  shuffleNumbers(AVATAR_NUMBERS);

  for (let i = 0; i < ADVERTISEMENT_QUANTITY; i++) {
    const randomAvatarLink = `img/avatars/user0${AVATAR_NUMBERS[i]}.png`;

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

  const existFeatures = FEATURES.slice(Math.floor(Math.random() * FEATURES.length));

  const attachedPhotos = PHOTOS.slice(Math.floor(Math.random() * PHOTOS.length));

  for (let i = 0; i < ADVERTISEMENT_QUANTITY; i++) {
    const randomAdvertisement = {
      author: {
        avatar: avatars[i]
      },
      offer: {
        title: getRandomString(TITLES),
        address: ``,
        price: getRandomNumber(Price.MIN, Price.MAX),
        type: getRandomString(TYPES),
        rooms: getRandomNumber(Room.MIN, Room.MAX),
        guests: getRandomNumber(Guest.MIN, Guest.MAX),
        checkin: getRandomString(CHECKIN_TIMES),
        checkout: getRandomString(CHECKOUT_TIMES),
        features: existFeatures,
        description: DESCRIPTION,
        photos: attachedPhotos
      },
      location: {
        x: getRandomNumber(AddressX.MIN, AddressX.MAX),
        y: getRandomNumber(AddressY.MIN, AddressY.MAX)
      }
    };

    randomAdvertisement.offer.address = `${randomAdvertisement.location.x}, ${randomAdvertisement.location.y}`;

    randomAdvertisements.push((randomAdvertisement));
  }

  return randomAdvertisements;
};

getRandomAdvertisement();

const calculatePinContentLeft = (advert) => {
  return advert.location.x - PinSize.WIDTH / 2;
};

const calculatePinContentTop = (advert) => {
  return advert.location.y - PinSize.HEIGHT;
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

const fillFragment = () => {
  const fragment = document.createDocumentFragment();

  randomAdvertisements.forEach((item) => {
    fragment.appendChild(renderPin(item));
  });

  mapPins.appendChild(fragment);
};

// Activate Map

const mapPinMain = document.querySelector(`.map__pin--main`);
const adForm = document.querySelector(`.ad-form`);
const adFormElements = adForm.querySelectorAll(`fieldset`);
const filterFormElements = document.querySelectorAll(`select, fieldset`);

mapPinMain.addEventListener(`mousedown`, (evt) => {
  if (!evt.button) {
    setActivateState();
    fillFragment();
  }
}, {once: true});

mapPinMain.addEventListener(`keydown`, (evt) => {
  if (evt.key === ENTER_BUTTON) {
    setActivateState();
    fillFragment();
  }
}, {once: true});

const setActivateState = () => {
  map.classList.remove(`map--faded`);
  adForm.classList.remove(`ad-form--disabled`);
  adFormElements.forEach((item) => {
    item.removeAttribute(`disabled`);
  });
  filterFormElements.forEach((item) => {
    item.removeAttribute(`disabled`);
  });
  addressInput.value = `${pinMainPosition.x}, ${pinMainPosition.y}`;
};

// Filling address input

const addressInput = adForm.querySelector(`#address`);

const pinMainInitialPosition = {
  x: Math.floor(InitialPinPosition.X + PinRoundSize.WIDTH / 2),
  y: Math.floor(InitialPinPosition.Y + PinRoundSize.HEIGHT / 2)
};

const pinMainPosition = {
  x: Math.floor(InitialPinPosition.X + PinRoundSize.WIDTH / 2),
  y: Math.floor(InitialPinPosition.Y + PinRoundSize.HEIGHT + PinEdgeSize.HEIGHT)
};

if (map.classList.contains(`map--faded`)) {
  const setInactivateState = function () {
    map.classList.add(`map--faded`);
    adForm.classList.add(`ad-form--disabled`);
    adFormElements.forEach((item) => {
      item.setAttribute(`disabled`, ``);
    });
    filterFormElements.forEach((item) => {
      item.setAttribute(`disabled`, ``);
    });
    addressInput.value = `${pinMainInitialPosition.x}, ${pinMainInitialPosition.y}`;
  };
  setInactivateState();
}

// Rooms and Guests Compare

const roomToGuestQuantity = {
  1: [`1`],
  2: [`1`, `2`],
  3: [`1`, `2`, `3`],
  100: [`0`]
};

const roomNumber = adForm.querySelector(`#room_number`);
const guestQuantity = adForm.querySelector(`#capacity`);

const removeAttributeOption = function (element) {
  element.removeAttribute(`disabled`);
};

const addClassOption = function (element) {
  element.classList.add(`hidden`);
};

const onRoomChange = function () {
  const guests = roomToGuestQuantity[roomNumber.value];
  [].forEach.call(guestQuantity.options, function (element) {
    if (guests.includes(element.value)) {
      removeAttributeOption(element);
    } else {
      addClassOption(element);
    }
  });
  guestQuantity.value = guests[0];
};

roomNumber.addEventListener(`change`, onRoomChange);

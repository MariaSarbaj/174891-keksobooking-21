'use strict';
const map = document.querySelector(`.map`);
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const mapPins = document.querySelector(`.map__pins`);

const AD_QUANTITY = 8;
const TITLES_LIST = [`Большая уютная квартира`, `Маленькая неуютная квартира`, `Огромный прекрасный дворец`, `Маленький ужасный дворец`, `Красивый гостевой домик`, `Некрасивый негостеприимный домик`, `Уютное бунгало далеко от моря`, `Неуютное бунгало по колено в воде`];
const ADDRESS_COORS_X = {
  MIN: 0,
  MAX: 1200
};
const ADDRESS_COORS_Y = {
  MIN: 130,
  MAX: 630
};
const PRICE = {
  MIN: 1000,
  MAX: 1000000
};
const TYPES = [`palace`, `flat`, `house`, `bungalow`];
const ROOMS = {
  MIN: 1,
  MAX: 5
};
const GUESTS = {
  MIN: 1,
  MAX: 30
};
const CHECKIN = [`12:00`, `13:00`, `14:00`];
const CHECKOUT = [`12:00`, `13:00`, `14:00`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const DESCRIPTION = ``;
const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];

const PIN_SIZES = {
  WIDTH: 50,
  HEIGHT: 70
};

let avatarsList = [];

let getAvatarLinksList = function () {
  let avatarNumbers = [1, 2, 3, 4, 5, 6, 7, 8];

  let shuffleNumbers = function (numbers) {
    for (let i = numbers.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = numbers[j];
      numbers[j] = numbers[i];
      numbers[i] = temp;
    }

    return avatarNumbers;
  };

  shuffleNumbers(avatarNumbers);

  for (let i = 0; i < 8; i++) {
    let randomAvatarLink = `img/avatars/user0` + avatarNumbers[i] + `.png`;

    avatarsList.push(randomAvatarLink);
  }

  return avatarsList;
};

getAvatarLinksList();

const randomAdsList = [];

let getRandomAd = function () {
  const getRandomString = function (array) {
    return array[Math.floor(Math.random() * array.length)];
  };

  const getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };

  const getFeaturesList = FEATURES.slice(Math.floor(Math.random() * FEATURES.length));

  const getPhotosList = PHOTOS.slice(Math.floor(Math.random() * PHOTOS.length));

  for (let i = 0; i < AD_QUANTITY; i++) {
    let randomAd = {
      author: {
        avatar: avatarsList[i]
      },
      offer: {
        title: getRandomString(TITLES_LIST),
        address: `${getRandomNumber(ADDRESS_COORS_X.MIN, ADDRESS_COORS_X.MAX)}, ${getRandomNumber(ADDRESS_COORS_Y.MIN, ADDRESS_COORS_Y.MAX)}`,
        price: `${getRandomNumber(PRICE.MIN, PRICE.MAX)} ₽/ночь`,
        type: getRandomString(TYPES),
        rooms: getRandomNumber(ROOMS.MIN, ROOMS.MAX),
        guests: getRandomNumber(GUESTS.MIN, GUESTS.MAX),
        checkin: getRandomString(CHECKIN),
        checkout: getRandomString(CHECKOUT),
        features: getFeaturesList,
        description: DESCRIPTION,
        photos: getPhotosList
      },
      location: {
        x: getRandomNumber(ADDRESS_COORS_X.MIN, ADDRESS_COORS_X.MAX) + PIN_SIZES.WIDTH / 2,
        y: getRandomNumber(ADDRESS_COORS_Y.MIN, ADDRESS_COORS_Y.MAX) + PIN_SIZES.HEIGHT
      }
    };

    randomAdsList.push((randomAd));
  }

  return randomAdsList;
};

getRandomAd();

const renderPin = function (randomAd) {
  let pinContent = pinTemplate.cloneNode(true);
  let img = pinContent.querySelector(`img`);
  pinContent.style.left = randomAd.location.x + `px`;
  pinContent.style.top = randomAd.location.y + `px`;
  img.src = randomAd.author.avatar;
  img.alt = randomAd.offer.title;
  return pinContent;
};

const feelingFragment = function () {
  const fragment = document.createDocumentFragment();

  randomAdsList.forEach(function (item) {
    fragment.appendChild(renderPin(item));
  });

  mapPins.appendChild(fragment);
};

feelingFragment();
map.classList.remove(`map--faded`);

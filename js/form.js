'use strict';

// Rooms and Guests Compare

const roomToGuestQuantity = {
  1: [`1`],
  2: [`1`, `2`],
  3: [`1`, `2`, `3`],
  100: [`0`]
};

const roomNumber = window.data.adForm.querySelector(`#room_number`);
const guestQuantity = window.data.adForm.querySelector(`#capacity`);

const onRoomNumberChange = () => {
  const guests = roomToGuestQuantity[roomNumber.value];
  [].forEach.call(guestQuantity.options, (element) => {
    element.disabled = !guests.includes(element.value);
  });
  guestQuantity.value = guests[0];
};

roomNumber.addEventListener(`change`, onRoomNumberChange);

// Min Price Per Night

const houseTypeToPrice = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000
};

const priceInput = window.data.adForm.querySelector(`#price`);
const typeInput = window.data.adForm.querySelector(`#type`);

const onTypeInputChange = (evt) => {
  const minPrice = houseTypeToPrice[evt.target.value];
  priceInput.min = minPrice;
  priceInput.placeholder = minPrice;
};

typeInput.addEventListener(`change`, onTypeInputChange);

// Initial Values

const setPriceInputInitial = () => {
  priceInput.min = window.data.MIN_PRICE;
  priceInput.placeholder = window.data.MIN_PRICE;
};

// CheckIn & Checkout

const checkTime = window.data.adForm.querySelector(`.ad-form__element--time`);

const checkinInput = window.data.adForm.querySelector(`#timein`);
const checkoutInput = window.data.adForm.querySelector(`#timeout`);

const onCheckTimeChange = (evt) => {
  checkinInput.value = evt.target.value;
  checkoutInput.value = evt.target.value;
};
checkTime.addEventListener(`change`, onCheckTimeChange);

// Set Address

const addressInput = window.data.adForm.querySelector(`#address`);

const setAddress = (location) => {
  addressInput.value = `${location.x}, ${location.y}`;
};

// Deactivate Page

const deactivatePage = () => {
  window.data.adForm.reset();
  window.data.mapFilters.removeEventListener(`change`, window.filter.onChange);
  window.map.inactivate();
  roomNumber.addEventListener(`change`, onRoomNumberChange);
  setPriceInputInitial();
  window.uploadPhoto.reset();
};

// Submit

const onAdFormSubmit = (evt) => {
  evt.preventDefault();

  const onSubmitSuccess = () => {
    deactivatePage();
    window.map.clearPins();
    window.utils.showSuccessMessage();
  };

  const onSubmitError = (message) => {
    window.utils.showErrorMessage(message);
  };

  window.backend(new FormData(window.data.adForm), onSubmitSuccess, onSubmitError, window.data.Method.POST, window.data.URL_POST);
};

window.data.adForm.addEventListener(`submit`, onAdFormSubmit);

// Reset

const resetButton = window.data.adForm.querySelector(`.ad-form__reset`);

resetButton.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  deactivatePage();
});

window.form = {
  setAddress,
};

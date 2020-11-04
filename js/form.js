'use strict';

(() => {
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

  const buildTypeToPrice = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  const priceInput = window.data.adForm.querySelector(`#price`);
  const typeInput = window.data.adForm.querySelector(`#type`);

  const onTypeInputChange = (evt) => {
    const minPrice = buildTypeToPrice[evt.target.value];
    priceInput.min = minPrice;
    priceInput.placeholder = minPrice;
  };

  typeInput.addEventListener(`change`, onTypeInputChange);

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

  // Submit

  const onSubmitForm = (evt) => {
    evt.preventDefault();

    const onSubmitSuccess = () => {
      window.data.adForm.reset();
      window.map.clearPins();
      window.map.inactivate();
      window.utils.showSuccessMessage();
    };

    const onSubmitError = (message) => {
      window.utils.showErrorMessage(message);
    };

    window.post(new FormData(window.data.adForm), onSubmitSuccess, onSubmitError);
  };

  window.data.adForm.addEventListener(`submit`, onSubmitForm);

  // Reset

  const resetButton = window.data.adForm.querySelector(`.ad-form__reset`);

  resetButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    window.data.adForm.reset();
  });

  window.form = {
    setAddress,
  };
})();

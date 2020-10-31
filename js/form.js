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

  const typeMinPrice = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  const priceInput = window.data.adForm.querySelector(`#price`);
  const typeInput = window.data.adForm.querySelector(`#type`);

  const onTypeInputChange = (event) => {
    const minPrice = typeMinPrice[event.target.value];
    priceInput.min = minPrice;
    priceInput.placeholder = minPrice;
  };

  typeInput.addEventListener(`change`, onTypeInputChange);

  // CheckIn & Checkout

  const checkTime = window.data.adForm.querySelector(`.ad-form__element--time`);

  const checkinInput = window.data.adForm.querySelector(`#timein`);
  const checkoutInput = window.data.adForm.querySelector(`#timeout`);

  const onCheckTimeChange = (event) => {
    checkinInput.value = event.target.value;
    checkoutInput.value = event.target.value;
  };
  checkTime.addEventListener(`change`, onCheckTimeChange);
})();

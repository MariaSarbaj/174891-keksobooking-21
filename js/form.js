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
})();

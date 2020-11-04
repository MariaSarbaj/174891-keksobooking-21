'use strict';

(() => {
  window.data.mapPinMain.addEventListener(`mousedown`, (evt) => {
    evt.preventDefault();

    let initialCoordinates = {
      x: evt.clientX,
      y: evt.clientY
    };

    const onMapPinMouseMove = (moveEvt) => {
      moveEvt.preventDefault();

      const shift = {
        x: initialCoordinates.x - moveEvt.clientX,
        y: initialCoordinates.y - moveEvt.clientY
      };

      initialCoordinates = {
        x: moveEvt.x,
        y: moveEvt.y,
      };

      const newCoordinates = {
        x: window.data.mapPinMain.offsetLeft - shift.x,
        y: window.data.mapPinMain.offsetTop - shift.y
      };

      // Вычисляем границы области для перемещения

      const minX = 0 - window.data.mapPinMain.offsetWidth / 2;
      const maxX = window.data.mapPinsAreaWidth - window.data.mapPinMain.offsetWidth / 2 + window.data.CORRECTION_FACTOR;
      const minY = window.data.DragLimit.Y.MIN - window.data.mapPinMain.offsetHeight - window.data.PinEdgeSize.HEIGHT;
      const maxY = window.data.DragLimit.Y.MAX - window.data.mapPinMain.offsetHeight - window.data.PinEdgeSize.HEIGHT;

      // Перемещаем метку в найденных границах

      if (newCoordinates.x >= minX && newCoordinates.x <= maxX) {
        window.data.mapPinMain.style.left = `${newCoordinates.x}px`;
      }

      if (newCoordinates.y >= minY && newCoordinates.y <= maxY) {
        window.data.mapPinMain.style.top = `${newCoordinates.y}px`;
      }

      window.form.setAddress(window.pin.getLocation());
    };

    const onMapPinMouseUp = (upEvt) => {
      upEvt.preventDefault();
      window.form.setAddress(window.pin.getLocation());
      document.removeEventListener(`mousemove`, onMapPinMouseMove);
      document.removeEventListener(`mouseup`, onMapPinMouseUp);
    };

    document.addEventListener(`mousemove`, onMapPinMouseMove);
    document.addEventListener(`mouseup`, onMapPinMouseUp);
  });
})();

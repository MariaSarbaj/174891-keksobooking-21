'use strict';

(() => {

  const Code = {
    SUCCESS: 200,
    REQUEST_ERROR: 400,
    NOT_USER_ERROR: 401,
    NOT_FOUND_ERROR: 404
  };

  window.load = (onSuccess, onError) => {

    const xhr = new XMLHttpRequest();

    xhr.responseType = `json`;

    xhr.addEventListener(`load`, () => {
      let error;
      switch (xhr.status) {
        case Code.SUCCESS:
          onSuccess(xhr.response);
          break;
        case Code.REQUEST_ERROR:
          error = `Неверный запрос`;
          break;
        case Code.NOT_USER_ERROR:
          error = `Пользователь не авторизован`;
          break;
        case Code.NOT_FOUND_ERROR:
          error = `Ничего не найдено`;
          break;

        default:
          error = `Cтатус ответа: ${xhr.status} ${xhr.statusText}`;
      }

      if (error) {
        onError(error);
      }
    });

    xhr.addEventListener(`error`, () => {
      onError(`Произошла ошибка соединения`);
    });

    xhr.addEventListener(`timeout`, () => {
      onError(`Запрос не успел выполниться за ${xhr.timeout} мс`);
    });

    xhr.timeout = window.data.TIMEOUT;

    xhr.open(`GET`, window.data.URL_LOAD);
    xhr.send();
  };
})();


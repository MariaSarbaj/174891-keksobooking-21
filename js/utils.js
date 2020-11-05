'use strict';

(() => {

  const mainSection = document.querySelector(`main`);
  const successTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
  const errorTemplate = document.querySelector(`#error`).content.querySelector(`.error`);

  const showMessage = (template, errorMessage) => {
    const messageBody = template.cloneNode(true);

    if (errorMessage) {
      const errorText = messageBody.querySelector(`.error__message`);
      errorText.innerText = errorMessage;
    }

    mainSection.appendChild(messageBody);

    const messageRemoveHandler = () => {
      messageBody.remove();
      document.removeEventListener(`keydown`, onErrorMessageEscapeKeydown);
    };

    const onErrorMessageEscapeKeydown = (evt) => {
      if (evt.key === window.data.ESCAPE_BUTTON || evt.keyCode === window.data.ESCAPE_BUTTON_CODE) {
        messageRemoveHandler();
      }
    };

    const errorButton = messageBody.querySelector(`.error__button`);

    messageBody.addEventListener(`click`, messageRemoveHandler);

    if (errorButton) {
      errorButton.addEventListener(`click`, messageRemoveHandler);
    }

    document.addEventListener(`keydown`, onErrorMessageEscapeKeydown);
  };

  window.utils = {

    // Сообщение об ошибке при загрузке с сервера

    onLoadError: (message) => {
      const errorMessage = document.createElement(`div`);
      const style = errorMessage.style;
      errorMessage.textContent = message;
      style.width = `100vw`;
      style.height = `10vh`;
      style.fontSize = `6vh`;
      style.fontFamily = `Roboto`;
      style.color = `rgb(255, 255, 255)`;
      style.backgroundColor = `rgba(246, 95, 63, 0.7)`;
      style.position = `fixed`;
      style.zIndex = `1000`;
      style.display = `flex`;
      style.justifyContent = `center`;
      style.alignItems = `center`;
      style.top = `0`;
      style.left = `0`;
      document.body.appendChild(errorMessage);
      setTimeout(() => {
        document.body.removeChild(errorMessage);
      }, 3000);

    },

    // Сообщения при отправке

    showSuccessMessage: () => {
      showMessage(successTemplate);
    },

    showErrorMessage: (message) => {
      showMessage(errorTemplate, message);
    }

  };
})();


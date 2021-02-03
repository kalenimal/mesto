const configValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}; 

//показывает инпут с ошибкой
function showInputError (form, input, errorMessage) {
  const inputError = form.querySelector(`.${input.id}-error`);
  input.classList.add(configValidation.inputErrorClass);
  inputError.classList.add(configValidation.errorClass);
  inputError.textContent = errorMessage;
}

//показывает  инпут без ошибки
function hideInputerror (form, input) {
  const inputError = form.querySelector(`.${input.id}-error`);
  input.classList.remove(configValidation.inputErrorClass);
  inputError.classList.remove(configValidation.errorClass);
  inputError.textContent = "";
}

//проверяет инпут на валидность 
function checkValidity (form, input) {
  if (!input.validity.valid) {
    showInputError (form, input, input.validationMessage);
  } else {
    hideInputerror (form, input);
  }
};

//проверяет есть ли невалидный инпут в форме
function hasInvalidInput(inputList) {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};

//меняет состояние кнопки
function buttonState (inputList, button) {
  if (hasInvalidInput(inputList)) {
    button.classList.add(configValidation.inactiveButtonClass);
  } else {
    button.classList.remove(configValidation.inactiveButtonClass);
  }
}


//навешивает всем инпутам слушатель 
function setEventListeners (form) {
  const inputList = Array.from(form.querySelectorAll(configValidation.inputSelector));
  const button = form.querySelector(configValidation.submitButtonSelector);
   
  buttonState (inputList, button);

  inputList.forEach((input) => {
input.addEventListener('input', () => {
  checkValidity (form, input);
  buttonState (inputList, button);
});
  });
};

//вызывают функцию навешивания слушателей инпутам во всех формах
function enableValidation () {
  const formList = Array.from(document.querySelectorAll(configValidation.formSelector));
  formList.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners (form);
  });
};

enableValidation ();
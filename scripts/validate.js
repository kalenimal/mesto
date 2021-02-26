/* const configValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};  */

//настраивает  валидацию полей формы
export class FormValidator {
  constructor (config, form) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._form = form;
    }

//показывает инпут с ошибкой
_showInputError (input, errorMessage) {
  const inputError = this._form.querySelector(`.${input.id}-error`);
  input.classList.add(this._inputErrorClass);
  inputError.classList.add(this._errorClass);
  inputError.textContent = errorMessage;
}

//показывает  инпут без ошибки
_hideInputerror (input) {
  const inputError = this._form.querySelector(`.${input.id}-error`);
  input.classList.remove(this._inputErrorClass);
  inputError.classList.remove(this._errorClass);
  inputError.textContent = "";
}

//проверяет инпут на валидность 
_checkValidity (input) {
  if (!input.validity.valid) {
    this._showInputError (input, input.validationMessage);
  } else {
    this._hideInputerror (input);
  }
};

//проверяет есть ли невалидный инпут в форме
_hasInvalidInput(inputList) {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};

//меняет состояние кнопки
_buttonState (inputList, button) {
  if (this._hasInvalidInput(inputList)) {
    button.classList.add(this._inactiveButtonClass);
  } else {
    button.classList.remove(this._inactiveButtonClass);
  }
}


//навешивает всем инпутам слушатель 
_setEventListeners () {
  const inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
  const button = this._form.querySelector(this._submitButtonSelector);
   
  this._buttonState (inputList, button);

  inputList.forEach((input) => {
input.addEventListener('input', () => {
  this._checkValidity (input);
  this._buttonState (inputList, button);
});
  });
};

//вызывают функцию навешивания слушателей инпутам во всех формах
enableValidation () {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners ();
};
}



/* //показывает инпут с ошибкой
function showInputError (form, input, errorMessage, config) {
  const inputError = form.querySelector(`.${input.id}-error`);
  input.classList.add(config.inputErrorClass);
  inputError.classList.add(config.errorClass);
  inputError.textContent = errorMessage;
}

//показывает  инпут без ошибки
function hideInputerror (form, input, config) {
  const inputError = form.querySelector(`.${input.id}-error`);
  input.classList.remove(config.inputErrorClass);
  inputError.classList.remove(config.errorClass);
  inputError.textContent = "";
}

//проверяет инпут на валидность 
function checkValidity (form, input,config) {
  if (!input.validity.valid) {
    showInputError (form, input, input.validationMessage, config);
  } else {
    hideInputerror (form, input, config);
  }
};

//проверяет есть ли невалидный инпут в форме
function hasInvalidInput(inputList) {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};

//меняет состояние кнопки
function buttonState (inputList, button, config) {
  if (hasInvalidInput(inputList)) {
    button.classList.add(config.inactiveButtonClass);
  } else {
    button.classList.remove(config.inactiveButtonClass);
  }
}


//навешивает всем инпутам слушатель 
function setEventListeners (form, config) {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  const button = form.querySelector(config.submitButtonSelector);
   
  buttonState (inputList, button, config);

  inputList.forEach((input) => {
input.addEventListener('input', () => {
  checkValidity (form, input, config);
  buttonState (inputList, button, config);
});
  });
};

//вызывают функцию навешивания слушателей инпутам во всех формах
function enableValidation (config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners (form, config);
  });
};

enableValidation (configValidation); */
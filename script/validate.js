const validationConfig = {
    formElement: '.popup__body',
    inputElement: '.popup__input',
    buttonElement: '.popup__save',
    inactiveButtonClass: 'popup__save_inactive',
    inputErrorClass: 'popup__input_error',
    errorClass:'popup__input-error_active'
  }

//ВАЛИДАЦИЯ
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState  = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    makeButtonInactive(buttonElement, config)
  }
  else {
    makeButtonActive(buttonElement, config);
  };
};

const makeButtonActive = (buttonElement, config)=>{
  buttonElement.removeAttribute('disabled');
  buttonElement.classList.remove(config.inactiveButtonClass);
}

const makeButtonInactive = (buttonElement, config)=>{
  buttonElement.setAttribute('disabled', true);
  buttonElement.classList.add(config.inactiveButtonClass);
}

const showError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

const hideError = (formElement, inputElement, config) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent='';
};


const checkInputValidity = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideError(formElement, inputElement, config);
  }
};

const setEventListeners = (formElement,config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputElement));
  const buttonElement = formElement.querySelector(config.buttonElement);
  toggleButtonState(inputList, buttonElement,config);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement,config);
    });
  });


};
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formElement));
  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
};


enableValidation (validationConfig);

//ВАЛИДАЦИЯ
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState  = (inputList, buttonElement, obj) => {
  if (hasInvalidInput(inputList)) {
    makeButtonIncative(buttonElement)
  }
  else {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(obj.inactiveButtonClass);
  };
};

const makeButtonIncative = (buttonElement)=>{
  buttonElement.setAttribute('disabled', true);
  buttonElement.classList.add('popup__save_inactive');
}

const showError = (formElement, inputElement, errorMessage, obj) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(obj.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(obj.errorClass);
};

const hideError = (formElement, inputElement, obj) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(obj.inputErrorClass);
  errorElement.classList.remove(obj.errorClass);
  errorElement.textContent='';
};

const checkInputValidity = (formElement, inputElement, obj) => {
  if (!inputElement.validity.valid) {
    showError(formElement, inputElement, inputElement.validationMessage, obj);
  } else {
    hideError(formElement, inputElement, obj);
  }
};

const setEventListeners = (formElement,obj) => {
  const inputList = Array.from(formElement.querySelectorAll(obj.inputElement));
  const buttonElement = formElement.querySelector(obj.buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, obj);
      toggleButtonState(inputList, buttonElement,obj);
    });
  });


};
const enableValidation = (obj) => {
  const formList = Array.from(document.querySelectorAll(obj.formElement));
  formList.forEach((formElement) => {
       setEventListeners(formElement, obj);
  });
};


enableValidation ({
  formElement: '.popup__body',
  inputElement: '.popup__input',
  buttonElement: '.popup__save',
  inactiveButtonClass: 'popup__save_inactive',
  inputErrorClass: 'popup__input_error',
  errorClass:'popup__input-error_active'
});

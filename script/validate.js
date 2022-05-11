//ВАЛИДАЦИЯ
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    console.log(!inputElement.validity.valid);
    return !inputElement.validity.valid;
  });
};

const toggleButtonState  = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    makeButtonInactive(buttonElement)
  }
  else {
    makeButtonActive(buttonElement);
  };
};

const makeButtonActive = (buttonElement)=>{
  buttonElement.removeAttribute('disabled');
  buttonElement.classList.remove('popup__save_inactive');
}

const makeButtonInactive = (buttonElement)=>{
  buttonElement.setAttribute('disabled', true);
  buttonElement.classList.add('popup__save_inactive');
}

const showError = (formElement, inputElement, errorMessage, obj) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(obj.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(obj.errorClass);
};

const hideError = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  inputList.forEach((inputElement)=>{
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_error');
    errorElement.classList.remove('popup__input-error_active');
    errorElement.textContent='';
  })
};


const checkInputValidity = (formElement, inputElement, obj) => {
  if (!inputElement.validity.valid) {
    showError(formElement, inputElement, inputElement.validationMessage, obj);
  } else {
    hideError(formElement);
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
  inputErrorClass: 'popup__input_error',
  errorClass:'popup__input-error_active'
});

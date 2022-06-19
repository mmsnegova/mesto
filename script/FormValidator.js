export default class FormValidator {

  constructor (config, formElement){
    this._inputElement=config.inputElement;
    this._buttonElement=config.buttonElement;
    this._inactiveButtonClass=config.inactiveButtonClass;
    this._inputErrorClass=config.inputErrorClass;
    this._errorClass=config.errorClass;
    this._formElement=formElement;
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _makeButtonActive (buttonElement){
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(this._inactiveButtonClass);
  }

  _makeButtonInactive (buttonElement){
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add(this._inactiveButtonClass);
  }

  _toggleButtonState(inputList, buttonElement){
    if (this._hasInvalidInput(inputList)) {
      this._makeButtonInactive(buttonElement);
    }
    else {
      this._makeButtonActive(buttonElement);
    };
  };

  _showError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  _hideError(inputElement){
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent='';
  };

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showError(inputElement, inputElement.validationMessage);
    } else {
      this._hideError(inputElement);
    }
  };

  _setEventListeners() {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputElement));
    this._buttonElement = this._formElement.querySelector(this._buttonElement);
    this._toggleButtonState(this._inputList,  this._buttonElement);
    this._inputList.forEach((inputElement)=>{
      inputElement.addEventListener('input', ()=>{
        this._checkInputValidity(inputElement);
        this._toggleButtonState(this._inputList,  this._buttonElement);
       });
    });
  };

  enableValidation(){
    this._setEventListeners();
  };


  resetValidation(inputList){
    inputList.forEach(input=>
      this._hideError(input))
  }

  resetButtonInactive(buttonElement){
    this._makeButtonInactive(buttonElement);
  }

  resetButtonActive(buttonElement){
    this._makeButtonActive(buttonElement);
  }

}

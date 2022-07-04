import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup{
    constructor(popupSelector,){
        super(popupSelector);
        this._buttonConfirmation = this._popup.querySelector('.popup__save');
    }


    renderLoading (isLoading){
        if (isLoading){
            this._buttonConfirmation.textContent = 'Удаление...';
          }
          else {
            this._buttonConfirmation.textContent = 'Да';
          }
    }

    callBack(handleButtonConfirmation){
        this._handleButtonConfirmation = handleButtonConfirmation;
    }

    setEventListenerClickButton(){
        this._buttonConfirmation.addEventListener('click',this._handleButtonConfirmation);
    }

    removeEventListenerClickButton(){
        this._buttonConfirmation.removeEventListener('click',this._handleButtonConfirmation);
    }
}


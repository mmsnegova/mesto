import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup{
    constructor(popupSelector,){
        super(popupSelector);
        this._buttonConfirmation = this._popup.querySelector('.popup__save');
    }

    callBack(handleButtonConfirmation){
        this._handleButtonConfirmation = handleButtonConfirmation;
    }

    setEventListenerClickButton(){
        this._buttonConfirmation.addEventListener('click',this._handleButtonConfirmation);
    }

    close(){
        super.close();
        this._buttonConfirmation.removeEventListener('click',this._handleButtonConfirmation);
    }
}


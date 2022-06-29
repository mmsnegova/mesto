import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup{
    constructor(popupSelector,api){
        super(popupSelector);
        this._buttonConfirmation = this._popup.querySelector('.popup__save');
        this._api = api;
    }

    _handleButtonConfirmation(element,id){
        this._api.deleteCard(id)
            .then(()=>{
                element.remove();
                element = null;
            })
        this.close();
    }

    setEventListeners(element,id){
        super.setEventListeners();
        this._buttonConfirmation.addEventListener('click',()=>{
            this._handleButtonConfirmation(element, id);
        })

    }

}

import Popup from './Popup.js';

export default class PopupWithImage extends Popup{
    constructor(name,link,popupSelector){
        super(popupSelector);
        this._name=name;
        this._link=link;
        this._imagePopupView=this._popup.querySelector('.popup__image');
        this._subtitlePopupView=this._popup.querySelector('.popup__subtitle');
    }

    open (){
        this._imagePopupView.src=this._link;
        this._imagePopupView.alt=this._name;
        this._subtitlePopupView.textContent=this._name;
        super.open();
    }

}
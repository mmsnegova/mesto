import Popup from './Popup.js';

export default class PopupWithImage extends Popup{
    constructor(popupSelector){
        super(popupSelector);
        this._imagePopupView=this._popup.querySelector('.popup__image');
        this._subtitlePopupView=this._popup.querySelector('.popup__subtitle');
    }

    open (name,link){
        this._imagePopupView.src=link;
        this._imagePopupView.alt=name;
        this._subtitlePopupView.textContent=name;
        super.open();
    }

} 
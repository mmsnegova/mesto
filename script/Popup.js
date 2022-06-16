export default class Popup {
    constructor(popupSelector){
        this._popup=document.querySelector(popupSelector);
    }

    _handleEscClose(evt){
        if(evt.key==='Escape'){
            this.closePopup();
          }
    }

    setEventListeners(){
        const buttonClose =  this._popup.querySelector('.popup__close', )
        buttonClose.addEventListener('click',this.closePopup.bind(this));
        this._popup.addEventListener('click',(evt)=>{
            if(evt.target===evt.currentTarget){
                this.closePopup();
            }
        })
    }

    openPopup(){
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown',this._handleEscClose.bind(this));
    }

    closePopup (){
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown',this._handleEscClose.bind(this));
    };
}



export default class Popup {
    constructor(popupSelector){
        this._popup=document.querySelector(popupSelector);
    }

    _handleEscClose(evt){
        if(evt.key==='Escape'){
            this.close();
          }
    }

    setEventListeners(){
        const buttonClose =  this._popup.querySelector('.popup__close', )
        buttonClose.addEventListener('click',this.close.bind(this));
        this._popup.addEventListener('click',(evt)=>{
            if(evt.target===evt.currentTarget){
                this.close();
            }
        })
    }
    open(){
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown',this._handleEscClose.bind(this));
    }

    close(){
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown',this._handleEscClose.bind(this));
    };
}



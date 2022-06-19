import Popup from './Popup.js';

export default class PopupWithForm extends Popup{
    constructor (popupSelector,{handleFormSubmit}){
        super(popupSelector);
        this.form = this._popup.querySelector('.popup__body');
        this.buttonSubmit = this._popup.querySelector('.popup__save');
        this._handleFormSubmit=handleFormSubmit;
        this._inputList = Array.from(this.form.querySelectorAll('.popup__input'));
    }

    getInputList(){
        this._inputList = Array.from(this.form.querySelectorAll('.popup__input'));
        return this._inputList;
    }

    _getInputValues(){    
        this._formValues={};
        this.getInputList().forEach(input=>
            this._formValues[input.name]=input.value);
        return this._formValues;
    }

    setInputValue(data){
        this.getInputList().forEach((input)=>{
            input.value = data[input.name]
        });
        }

    setEventListeners(){
        this.form.addEventListener('submit',(evt)=> {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues())
        });
        super.setEventListeners();
    }

    close(){
        super.close();
        this.form.reset();
    }



}
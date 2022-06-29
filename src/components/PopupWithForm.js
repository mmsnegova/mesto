import Popup from './Popup.js';

export default class PopupWithForm extends Popup{
    constructor (popupSelector,{handleFormSubmit}){
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__body');
        this._handleFormSubmit=handleFormSubmit;
        this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
        /* this._api = api; */
    }
    
    _getInputValues(){    
        this._formValues={};
        this._inputList.forEach(input=>
            this._formValues[input.name]=input.value);
        return this._formValues;
    }

    getNameForm(){
        this._nameForm = this._form.getAttribute('name');
        return this._nameForm;
    }

    setInputValue(data){
        this._inputList.forEach((input)=>{
            input.value = data[input.name]
        });
        }

    setEventListeners(){
        this._form.addEventListener('submit',(evt)=> {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues())
        });
        super.setEventListeners();
    }

    close(){
        super.close();
        this._form.reset();
    }



}
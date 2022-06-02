import {openPopup, closePopup, popupView, buttonClosePopupView, imagePopupView, subtitlePopupView} from './utils.js';

export default class Card {
  constructor(item,cardSelector){
    this._name=item.name;
    this._link=item.link;
    this._cardSelector=cardSelector;
  }

  _getTemplate(){
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector('.gallery__item')
      .cloneNode(true);

    return cardElement;
  }

  _generateGalleryCard(){
    this._element = this._getTemplate();
    this._element.querySelector('.gallery__title').textContent = this._name;
    this._element.querySelector('.gallery__image').src = this._link;
    this._element.querySelector('.gallery__image').alt = this._name;
    this._setEventListeners();
    return this._element;
  }

  renderGalleryCard (conteiner) {
    conteiner.prepend(this._generateGalleryCard());
  }

  _handleGallaryCardDelete () {
    this._element.remove();
  };

  _handleGallaryCardLike () {
    this._element.querySelector('.gallery__like').classList.toggle('gallery__like_active');
  }

  _handleOpenPopup(){
    imagePopupView.src=this._link;
    imagePopupView.alt= this._name;
    subtitlePopupView.textContent = this._name;
    openPopup(popupView);
  }

  _handleClosePopup() {
    imagePopupView.src='';
    imagePopupView.alt= '';
    subtitlePopupView.textContent = '';
    closePopup(popupView);
  }

  _setEventListeners() {
    this._element.querySelector('.gallery__delete').addEventListener('click', ()=> {
      this._handleGallaryCardDelete();
    });

    this._element.querySelector('.gallery__like').addEventListener('click', ()=> {
      this._handleGallaryCardLike();
    })

    this._element.querySelector('.gallery__image').addEventListener('click', ()=> {
      this._handleOpenPopup();
    });

    buttonClosePopupView.addEventListener('click', ()=> {
      this._handleClosePopup();
    });


  }


}

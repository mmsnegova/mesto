//import {openPopup, closePopup, popupView, buttonClosePopupView, imagePopupView, subtitlePopupView} from './utils.js';

export default class Card {
  constructor(data,cardSelector,handleCardClick){
    this._name=data.name;
    this._link=data.link;
    this._cardSelector=cardSelector;
    this._handleCardClick=handleCardClick;
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
    this._cardImage = this._element.querySelector('.gallery__image');
    this._likeButton = this._element.querySelector('.gallery__like');
    this._deleteButton = this._element.querySelector('.gallery__delete');
    this._element.querySelector('.gallery__title').textContent = this._name;
    this._cardImage.alt = this._name;
    this._cardImage.src = this._link;
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
    this._likeButton.classList.toggle('gallery__like_active');
  }


  _handleClosePopup() {
    imagePopupView.src='';
    imagePopupView.alt= '';
    subtitlePopupView.textContent = '';
    closePopup(popupView);
  }

  _setEventListeners() {
    this._cardImage.addEventListener('click',()=>{
      this._handleCardClick(this._name, this._link)
    });

    this._deleteButton.addEventListener('click', ()=> {
      this._handleGallaryCardDelete();
    });

    this._likeButton.addEventListener('click', ()=> {
      this._handleGallaryCardLike();
    })

/*     this._element.querySelector('.gallery__image').addEventListener('click', ()=> {
      this._handleOpenPopup();
    });

    buttonClosePopupView.addEventListener('click', ()=> {
      this._handleClosePopup();
    });
 */

  }


}

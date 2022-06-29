export default class Card {
  constructor(data,cardSelector,handleCardClick){
    this._name=data.name;
    this._link=data.link;
    this._likes = data.likes;
    this._cardSelector=cardSelector;
    this._handleCardClick=handleCardClick;
  };

  _getTemplate(){
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector('.gallery__item')
      .cloneNode(true);

    return cardElement;
  };

  generateGalleryCard(){
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.gallery__image');
    this._likeButton = this._element.querySelector('.gallery__like');
    this._deleteButton = this._element.querySelector('.gallery__delete');
    this._cardTitle = this._element.querySelector('.gallery__title');
    this._cardLikes =this._element.querySelector('.gallery__number-like');
    this._cardTitle.textContent = this._name;
    this._cardImage.alt = this._name;
    this._cardImage.src = this._link;
    this._cardLikes.textContent = this._likes.length;
    this._setEventListeners();
    return this._element;
  };

  _handleGallaryCardDelete () {
    this._element.remove();
    this._element = null;
  };

  _handleGallaryCardLike () {
    this._likeButton.classList.toggle('gallery__like_active');
  };


  _setEventListeners() {
    this._cardImage.addEventListener('click',()=>{
      this._handleCardClick(this._name, this._link)
    });

    this._deleteButton.addEventListener('click', ()=> {
      this._handleGallaryCardDelete();
    });

    this._likeButton.addEventListener('click', ()=> {
      this._handleGallaryCardLike();
    });

  };

}

export default class Card {
  constructor(data,cardSelector,handleCardClick, popupWithConformation, userInfo, {handleGallaryCardLike}){
    this._name=data.name;
    this._link=data.link;
    this._id = data._id;
    this._owner = data.owner;
    this._likes = data.likes;
    this._cardSelector=cardSelector;
    this._handleCardClick=handleCardClick;
    this._popupWithConformation = popupWithConformation;
    this._userInfo=userInfo;
    this._userId=userInfo._id;
    this._handleGallaryCardLike= handleGallaryCardLike;
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
    if(this._owner._id!==this._userId){
      this._deleteButton.remove();
    }
    this._cardTitle = this._element.querySelector('.gallery__title');
    this._cardLikes =this._element.querySelector('.gallery__number-like');
    if(this._likes.some(user => user._id === this._userId)){
      this._likeButton.classList.add('gallery__like_active');
    }
    this._cardTitle.textContent = this._name;
    this._cardImage.alt = this._name;
    this._cardImage.src = this._link;
    this._cardLikes.textContent = this._likes.length;
    this._setEventListeners();
    return this._element;
  };

  _handleGallaryCardDelete () {
    this._popupWithConformation.setEventListeners(this._element, this._id);
    this._popupWithConformation.open();
  };

  checkLikeUser(){
    return this._likeButton.classList.contains('gallery__like_active');
  }

  putLike(res){
    this._likeButton.classList.add('gallery__like_active');
    this._cardLikes.textContent = res.likes.length;
  }

  deleteLike(res){
    this._likeButton.classList.remove('gallery__like_active');
    this._cardLikes.textContent = res.likes.length;
  }





  _setEventListeners() {
    this._cardImage.addEventListener('click',()=>{
      this._handleCardClick(this._name, this._link)
    });

    this._deleteButton.addEventListener('click', ()=> {
      this._handleGallaryCardDelete();
    });

    this._likeButton.addEventListener('click', ()=> {
      this._handleGallaryCardLike(this._id, this._userInfo);
    });

  };

}

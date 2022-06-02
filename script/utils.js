const popupView = document.querySelector('.popup_view');
const buttonClosePopupView = popupView.querySelector('.popup__close');
const imagePopupView = popupView.querySelector('.popup__image');
const subtitlePopupView = popupView.querySelector('.popup__subtitle');


const heandleEscKeydown = (evt) => {
  if(evt.key==='Escape'){
    closePopup(document.querySelector('.popup_opened'));
  }
};

const heandlePopupOverlayClick = (evt) => {
  if(evt.target===evt.currentTarget){
    closePopup(evt.target);
  }
};

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', heandleEscKeydown);
  popup.addEventListener('click',heandlePopupOverlayClick);
};

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', heandleEscKeydown);
  popup.removeEventListener('click',heandlePopupOverlayClick);
};

export {openPopup, closePopup, popupView, buttonClosePopupView, imagePopupView, subtitlePopupView};

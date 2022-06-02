import Card from './Card.js';
import FormValidator from './FormValidator.js';
import {openPopup, closePopup} from './utils.js';

const galleryConteiner = document.querySelector('.gallery__list');
const validationConfig = {
  inputElement: '.popup__input',
  buttonElement: '.popup__save',
  inactiveButtonClass: 'popup__save_inactive',
  inputErrorClass: 'popup__input_error',
  errorClass:'popup__input-error_active'
}

initialCards.forEach((item)=>{
  const card = new Card(item,'.gallery-template_type_default');
  card.renderGalleryCard(galleryConteiner);
})

const formList = Array.from(document.querySelectorAll('.popup__body'));
formList.forEach((formElement)=>{
  const formValidator = new FormValidator(validationConfig,formElement);
  formValidator.enableValidation();
})



const buttonOpenPopupEdit = document.querySelector('.profile__edit');
const popupEdit = document.querySelector('.popup_edit');
const buttonClosePopupEdit = popupEdit.querySelector('.popup__close');
const formEdit = popupEdit.querySelector('.popup__body');
const nameInput = formEdit.querySelector('.popup__input_name');
const jobInput  = formEdit.querySelector('.popup__input_job');
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__job');
const buttonSubmitFormEdit = formEdit.querySelector('.popup__save');

const handleOpenPopupEdit = ()=>{
  nameInput.value=nameProfile.textContent;
  jobInput.value=jobProfile.textContent;
  openPopup(popupEdit);
  const formValidator = new FormValidator(validationConfig,popupEdit);
  formValidator.resetError(nameInput);
  formValidator.resetError(jobInput);
  formValidator.resetButtonActive(buttonSubmitFormEdit);
}

function handleProfileFormSubmit (evt) {
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  evt.preventDefault();
  closePopup(popupEdit);
};

const buttonOpenPopupAdd = document.querySelector('.profile__add');
const popupAdd= document.querySelector('.popup_add');
const formAdd = popupAdd.querySelector('.popup__body');
const namePlaceInpute = formAdd.querySelector('.popup__input_place-name');
const linkInput  = formAdd.querySelector('.popup__input_link');
const buttonClosePopupAdd = popupAdd.querySelector('.popup__close');
const buttonSubmitFormAdd = formAdd.querySelector('.popup__save');

const handleOpenPopupAdd = ()=>{
  formAdd.reset();
  const formValidator = new FormValidator(validationConfig,popupAdd);
  formValidator.resetError(namePlaceInpute);
  formValidator.resetError(linkInput);
  openPopup(popupAdd);
}
const handleAddCardFormSubmit = (evt)=> {
  evt.preventDefault();
  const item = {
    name: namePlaceInpute.value,
    link: linkInput.value
  }
  const card = new Card(item,'.gallery-template_type_default');
  card.renderGalleryCard(galleryConteiner);
  closePopup(popupAdd);
  const formValidator = new FormValidator(validationConfig,popupAdd);
  formValidator.resetButtonInactive(buttonSubmitFormAdd);
  };


formEdit.addEventListener('submit', handleProfileFormSubmit);
buttonOpenPopupEdit.addEventListener('click', handleOpenPopupEdit);
buttonClosePopupEdit.addEventListener('click', ()=>{
  closePopup(popupEdit);
});
formAdd.addEventListener('submit', handleAddCardFormSubmit);
buttonOpenPopupAdd.addEventListener('click', handleOpenPopupAdd);
buttonClosePopupAdd.addEventListener('click', ()=>{
  closePopup(popupAdd);
});




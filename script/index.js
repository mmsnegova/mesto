import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import Popup from './Popup.js';

/* const popupView = document.querySelector('.popup_view');
const buttonClosePopupView = popupView.querySelector('.popup__close');
const imagePopupView = popupView.querySelector('.popup__image');
const subtitlePopupView = popupView.querySelector('.popup__subtitle'); */

/* const heandleEscKeydown = (evt) => {
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
}; */

//функция с данными карточки
function handleCardClick(name, link){
  imagePopupView.src=link;
  imagePopupView.alt=name;
  subtitlePopupView.textContent=name;
  openPopup(popupView);
}


//функция создания экземпляра класса Card
function createCard(data){
  const card = new Card (data, '.gallery-template_type_default',handleCardClick);
  const cardElement = card.generateGalleryCard();
  return cardElement;
}

const galleryConteiner = document.querySelector('.gallery__list');

//функция создания экземпляра класса Section
function createSection(data){
  const cardList = new Section({
    items: data,
    renderer: (card) => {
      cardList.addItem(createCard(card));
    }
  }, galleryConteiner);
  cardList.renderItems();
}

//отрисовка карточек массива
createSection(initialCards);


const validationConfig = {
  formSelector: '.popup__body',
  inputElement: '.popup__input',
  buttonElement: '.popup__save',
  inactiveButtonClass: 'popup__save_inactive',
  inputErrorClass: 'popup__input_error',
  errorClass:'popup__input-error_active'
}


const formValidators = {};

// Включение валидации
function  enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement)
// получаем данные из атрибута `name` у формы
    const formName = formElement.getAttribute('name');
   // вот тут в объект записываем под именем формы
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validationConfig);

/* const buttonOpenPopupEdit = document.querySelector('.profile__edit');
const popupEdit = document.querySelector('.popup_edit');
const buttonClosePopupEdit = popupEdit.querySelector('.popup__close');
const formEdit = popupEdit.querySelector('.popup__body');
const nameInput = formEdit.querySelector('.popup__input_name');
const jobInput  = formEdit.querySelector('.popup__input_job');
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__job');
const buttonSubmitFormEdit = formEdit.querySelector('.popup__save'); */

/* const handleOpenPopupEdit = ()=>{
  nameInput.value=nameProfile.textContent;
  jobInput.value=jobProfile.textContent;
  openPopup(popupEdit);
  formValidators[formEdit.getAttribute('name')].resetError(nameInput);
  formValidators[formEdit.getAttribute('name')].resetError(jobInput);
  formValidators[formEdit.getAttribute('name')].resetButtonActive(buttonSubmitFormEdit);
} */

/* function handleProfileFormSubmit (evt) {
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  evt.preventDefault();
  closePopup(popupEdit);
}; */

/* const buttonOpenPopupAdd = document.querySelector('.profile__add');
const popupAdd= document.querySelector('.popup_add');
const formAdd = popupAdd.querySelector('.popup__body');
const namePlaceInpute = formAdd.querySelector('.popup__input_place-name');
const linkInput  = formAdd.querySelector('.popup__input_link');
const buttonClosePopupAdd = popupAdd.querySelector('.popup__close');
const buttonSubmitFormAdd = formAdd.querySelector('.popup__save');
 */
/* const handleOpenPopupAdd = ()=>{
  formAdd.reset();
  formValidators[formAdd.getAttribute('name')].resetError(namePlaceInpute);
  formValidators[formAdd.getAttribute('name')].resetError(linkInput);
  openPopup(popupAdd);
}
 */

/* const handleAddCardFormSubmit = (evt)=> {
  evt.preventDefault();
  const item = [{
    name: namePlaceInpute.value,
    link: linkInput.value
  }]
  //отрисовка новой карточки
  createSection(item);
  closePopup(popupAdd);
  formValidators[formAdd.getAttribute('name')].resetButtonInactive(buttonSubmitFormAdd);
  }; */



  
const buttonOpenPopupEdit = document.querySelector('.profile__edit')
const formEdit = new Popup('.popup_edit');
buttonOpenPopupEdit.addEventListener('click', ()=>{
  formEdit.openPopup()
});
formEdit.setEventListeners();

const buttonOpenPopupAdd = document.querySelector('.profile__add');
const formAdd = new Popup('.popup_edit');
buttonOpenPopupAdd.addEventListener('click',()=>{
  formAdd.openPopup()
});
formAdd.setEventListeners();





/* formEdit.addEventListener('submit', handleProfileFormSubmit);

buttonClosePopupEdit.addEventListener('click', ()=>{
  closePopup(popupEdit);
});
formAdd.addEventListener('submit', handleAddCardFormSubmit);
buttonOpenPopupAdd.addEventListener('click', handleOpenPopupAdd);
buttonClosePopupAdd.addEventListener('click', ()=>{
  closePopup(popupAdd);
});

buttonClosePopupView.addEventListener('click', ()=>{
  closePopup(popupView);
}) */



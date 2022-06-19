import Card from './components/Card.js';
import FormValidator from './components/FormValidator.js';
import Section from './components/Section.js';
import PopupWithImage from './components/PopupWithImage.js';
import UserInfo from './components/UserInfo.js';
import PopupWithForm from './components/PopupWithForm.js';
import {initialCards} from './cards.js'

//функция с данными карточки
function handleCardClick(name, link){
  const popupView = new PopupWithImage(name, link,'.popup_view');
  popupView.open();
  popupView.setEventListeners();
}


//функция создания экземпляра класса Card
function createCard(data){
  const card = new Card (data, '.gallery-template_type_default',handleCardClick);
  const cardElement = card.generateGalleryCard();
  return cardElement;
}

const galleryConteiner = document.querySelector('.gallery__list');

//создание экземпляра класса Section
const cardList = new Section({
  items: initialCards,
  renderer: (card) => {
    cardList.addItem(createCard(card));
  }
}, galleryConteiner);
cardList.renderItems();


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

const userInfo = new UserInfo({
    name: '.profile__name',
    job: '.profile__job'
  });


const buttonOpenPopupEdit = document.querySelector('.profile__edit')
const popupEdit = new PopupWithForm('.popup_edit',{
  handleFormSubmit:(formData)=>{
    userInfo.setUserInfo(formData);
    popupEdit.close();
    formValidators[popupEdit.form.getAttribute('name')].resetButtonInactive(popupEdit.buttonSubmit);
  }
});
popupEdit.setEventListeners();

buttonOpenPopupEdit.addEventListener('click', ()=>{
  popupEdit.setInputValue(userInfo.getUserInfo());
  popupEdit.open();
  formValidators[popupEdit.form.getAttribute('name')].resetValidation(popupEdit.getInputList());
  formValidators[popupEdit.form.getAttribute('name')].resetButtonActive(popupEdit.buttonSubmit);
});

const buttonOpenPopupAdd = document.querySelector('.profile__add');
const popupAdd = new PopupWithForm('.popup_add',{
  handleFormSubmit: (formData) =>{
    cardList.addItem(createCard(formData));
    popupAdd.close();
    formValidators[popupAdd.form.getAttribute('name')].resetButtonInactive(popupAdd.buttonSubmit);
  }  
});
buttonOpenPopupAdd.addEventListener('click',()=>{
  popupAdd.open();
  formValidators[popupAdd.form.getAttribute('name')].resetValidation(popupAdd.getInputList());
});
popupAdd.setEventListeners();


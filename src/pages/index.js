import Api from '../components/Api.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import {validationConfig} from '../utils/constans.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import './index.css';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-44',
  headers: {
    authorization: '6858ce5a-0ca5-4508-bf3e-e6a0c057ab0d',
    'Content-Type': 'application/json'
  } 
});

const loader = document.querySelector('.loader');

const hideLoader = ()=>{
    loader.classList.add('loader_hidden');
}

const userInfo = new UserInfo({
  name: '.profile__name',
  about: '.profile__about',
  avatar: '.profile__avatar'
});

//функция с данными карточки
const popupView = new PopupWithImage('.popup_view');
popupView.setEventListeners();
function handleCardClick(name, link){
  popupView.open(name, link);
}

const popupWithConfirmation = new PopupWithConfirmation('.popup_with-conformation', api);

//функция создания экземпляра класса Card
function createCard(data){
      const card = new Card (data, '.gallery-template_type_default',handleCardClick, popupWithConfirmation, userInfo.getUserInfo(), api);
      const cardElement = card.generateGalleryCard();
      return cardElement;
    }

 
const cardList = new Section({
    renderer: (card) => {
      cardList.addItemAppend(createCard(card));
    }
  }, '.gallery__list');


const formValidators = {};

// Включение валидации
function  enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
// получаем данные из атрибута `name` у формы
    const formName = formElement.getAttribute('name');
   // вот тут в объект записываем под именем формы
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validationConfig);

const buttonOpenPopupEdit = document.querySelector('.profile__edit')

const popupEdit = new PopupWithForm('.popup_edit',{
  handleFormSubmit:(formData)=>{
    popupEdit.renderLoading(true);
    api.patchUserInfo(formData)
    .then(res => {
      popupEdit.renderLoading(false);
      userInfo.setUserInfo(res)
      popupEdit.close();
      formValidators[popupEdit.getNameForm()].resetButtonInactive();
    })
    .catch((err)=>api.handleError(err))
  }
});
popupEdit.setEventListeners();

buttonOpenPopupEdit.addEventListener('click', ()=>{
  popupEdit.setInputValue(userInfo.getUserInfo());
  popupEdit.open();
  formValidators[popupEdit.getNameForm()].resetValidation();
  formValidators[popupEdit.getNameForm()].resetButtonActive();
});

const buttonOpenPopupUdateAvatar = document.querySelector('.profile__update-avatar');
const popupUpdateAvatar = new PopupWithForm('.popup_update-avatar',{
  handleFormSubmit: (formData) =>{
    popupUpdateAvatar.renderLoading(true);
    api.patchAvatar(formData)
    .then(res => {
      popupUpdateAvatar.renderLoading(false);
      userInfo.setUserInfo(res);
      popupUpdateAvatar.close();
      formValidators[popupUpdateAvatar.getNameForm()].resetButtonInactive();
    })
    .catch((err)=>api.handleError(err))
  }  
});

buttonOpenPopupUdateAvatar.addEventListener('click', ()=>{
  popupUpdateAvatar.setInputValue(userInfo.getUserInfo());
  popupUpdateAvatar.open();
  formValidators[popupUpdateAvatar.getNameForm()].resetValidation();
  formValidators[popupUpdateAvatar.getNameForm()].resetButtonActive();
});
popupUpdateAvatar.setEventListeners();


const buttonOpenPopupAdd = document.querySelector('.profile__add');
const popupAdd = new PopupWithForm('.popup_add',{
  handleFormSubmit: (formData) =>{
    popupAdd.renderLoading(true);
    api.createCard(formData)
    .then(res =>{
      popupAdd.renderLoading(false);
      cardList.addItemPrepend(createCard(res));
      popupAdd.close();
      formValidators[popupAdd.getNameForm()].resetButtonInactive();
    })
    .catch((err)=>api.handleError(err))
  }  
});

buttonOpenPopupAdd.addEventListener('click',()=>{
  popupAdd.open();
  formValidators[popupAdd.getNameForm()].resetValidation();
});
popupAdd.setEventListeners();


Promise.all([
  api.getInfo()
    .then((data) => {
      userInfo.setUserInfo(data);
    })
    .catch((err)=>api.handleError(err)),
    api.getCards()
      .then((cards) => {
        cardList.renderItems(cards);
      })
      .catch((err)=>api.handleError(err))
])
  .then(()=>{
    hideLoader();
  })
  .catch((err)=>api.handleError(err))





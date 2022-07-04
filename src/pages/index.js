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

//функция создания модального окна просмотра карточек
const popupView = new PopupWithImage('.popup_view');
popupView.setEventListeners();
function handleCardClick(name, link){
  popupView.open(name, link);
}

//функция создания окна предупреждения
const popupWithConfirmation = new PopupWithConfirmation('.popup_with-conformation');
popupWithConfirmation.setEventListeners();


function hendleButtonLikeCard(card, id, userInfo){
  if(!card.checkLikeUser()){
    api.putLike(id, userInfo)
      .then((res)=>card.putLike(res))
      .catch((err)=>api.handleError(err))
    }
  else{
    api.deleteLike(id, userInfo)
      .then((res)=>card.deleteLike(res))
      .catch((err)=>api.handleError(err))}
}

function hendleButtonDeleteCard(card, cardID){
  popupWithConfirmation.callBack(()=>{
    popupWithConfirmation.renderLoading(true);
    api.deleteCard(cardID)
    .then(()=>{
      card.deleteCard();
      popupWithConfirmation.close();
    })
    .catch((err)=>api.handleError(err))
    .finally(()=>popupWithConfirmation.renderLoading(false));
    popupWithConfirmation.removeEventListenerClickButton();
   });
    popupWithConfirmation.setEventListenerClickButton();
    popupWithConfirmation.open();
  }

//функция создания экземпляра класса Card
function createCard(data){
      const card = new Card (
        data, 
        '.gallery-template_type_default',
        handleCardClick, 
        userInfo.getUserInfo(), 
        {handleGallaryCardLike:
          (id, userInfo)=>hendleButtonLikeCard(card, id, userInfo)
        },
        {handleButtonDeleteCard:(cardID)=>
          hendleButtonDeleteCard(card, cardID)}
        );
      const cardElement = card.generateGalleryCard();
      return cardElement;
      };
 
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
    popupEdit.renderLoading(true)
    api.patchUserInfo(formData)
    .then(res => {
      userInfo.setUserInfo(res)
      popupEdit.close();
    })
    .catch((err)=>api.handleError(err))
    .finally(()=>popupEdit.renderLoading(false))
    formValidators[popupEdit.getNameForm()].resetButtonInactive()
  }
});
popupEdit.setEventListeners();

buttonOpenPopupEdit.addEventListener('click', ()=>{
  popupEdit.setInputValue(userInfo.getUserInfo());
  formValidators[popupEdit.getNameForm()].resetValidation();
  formValidators[popupEdit.getNameForm()].resetButtonActive();
  popupEdit.open();
});

const buttonOpenPopupUdateAvatar = document.querySelector('.profile__update-avatar');
const popupUpdateAvatar = new PopupWithForm('.popup_update-avatar',{
  handleFormSubmit: (formData) =>{
    popupUpdateAvatar.renderLoading(true);
    api.patchAvatar(formData)
    .then(res => {
      userInfo.setUserInfo(res);
      popupUpdateAvatar.close();
    })
    .catch((err)=>api.handleError(err))
    .finally(()=>popupUpdateAvatar.renderLoading(false))
    formValidators[popupUpdateAvatar.getNameForm()].resetButtonInactive();
  }  
});

buttonOpenPopupUdateAvatar.addEventListener('click', ()=>{
  popupUpdateAvatar.setInputValue(userInfo.getUserInfo());
  formValidators[popupUpdateAvatar.getNameForm()].resetValidation();
  formValidators[popupUpdateAvatar.getNameForm()].resetButtonActive();
  popupUpdateAvatar.open();
});
popupUpdateAvatar.setEventListeners();


const buttonOpenPopupAdd = document.querySelector('.profile__add');
const popupAdd = new PopupWithForm('.popup_add',{
  handleFormSubmit: (formData) =>{
    popupAdd.renderLoading(true);
    api.createCard(formData)
    .then(res =>{
      cardList.addItemPrepend(createCard(res));
      popupAdd.close();
    })
    .catch((err)=>api.handleError(err))
    .finally(()=>popupAdd.renderLoading(false));
    formValidators[popupAdd.getNameForm()].resetButtonInactive();
  }  
});

buttonOpenPopupAdd.addEventListener('click',()=>{
  formValidators[popupAdd.getNameForm()].resetValidation();
  popupAdd.open();
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
  .catch((err)=>api.handleError(err))
  .finally(()=>hideLoader())





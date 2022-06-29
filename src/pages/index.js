
import Api from '../components/Api.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import {initialCards} from '../utils/cards.js';
import {validationConfig} from '../utils/constans.js';
import './index.css';



const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-44',
  headers: {
    authorization: '6858ce5a-0ca5-4508-bf3e-e6a0c057ab0d',
    'Content-Type': 'application/json'
  } 
});

const userInfo = new UserInfo({
  name: '.profile__name',
  about: '.profile__job'
});

//запрос данных пользователя
api.getInfo()
  .then((data) => {
    userInfo.setUserInfo(data);
  })


  //получение карточек с сервера
api.getCards()
  .then((cards) => {
    //функция с данными карточки
    const popupView = new PopupWithImage('.popup_view');
    popupView.setEventListeners();
    function handleCardClick(name, link){
      popupView.open(name, link);
    }

    //функция создания экземпляра класса Card
    function createCard(data){
      const card = new Card (data, '.gallery-template_type_default',handleCardClick);
      const cardElement = card.generateGalleryCard();
      return cardElement;
    }
    //создание экземпляра класса Section
    const cardList = new Section({
      items: cards,
      renderer: (card) => {
        cardList.addItem(createCard(card));
      }
    }, '.gallery__list');
    cardList.renderItems();
  })
  

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
    userInfo.setUserInfo(formData);
    popupEdit.close();
    formValidators[popupEdit.getNameForm()].resetButtonInactive();
  }
});
popupEdit.setEventListeners();

buttonOpenPopupEdit.addEventListener('click', ()=>{
  popupEdit.setInputValue(userInfo.getUserInfo());
  popupEdit.open();
  formValidators[popupEdit.getNameForm()].resetValidation();
  formValidators[popupEdit.getNameForm()].resetButtonActive();
});

const buttonOpenPopupAdd = document.querySelector('.profile__add');
const popupAdd = new PopupWithForm('.popup_add',{
  handleFormSubmit: (formData) =>{
    cardList.addItem(createCard(formData));
    popupAdd.close();
    formValidators[popupAdd.getNameForm()].resetButtonInactive();
  }  
});
buttonOpenPopupAdd.addEventListener('click',()=>{
  popupAdd.open();
  formValidators[popupAdd.getNameForm()].resetValidation();
});
popupAdd.setEventListeners();


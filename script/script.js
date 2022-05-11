//массив мест

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//шаблоны

const galleryCardTemlate = document
  .querySelector('#gallery-template')
  .content.querySelector('.gallery__item');

//ДОМ элементы
//попап редактирования профиля

const buttonOpenPopupEdit = document.querySelector('.profile__edit');
const popupEdit = document.querySelector('.popup_edit');
const buttonClosePopupEdit = popupEdit.querySelector('.popup__close');
const formEdit = popupEdit.querySelector('.popup__body');
const nameInput = formEdit.querySelector('.popup__input_name');
const jobInput  = formEdit.querySelector('.popup__input_job');
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__job');

//попап добавления карточек
const buttonOpenPopupAdd = document.querySelector('.profile__add');
const popupAdd= document.querySelector('.popup_add');
const buttonClosePopupAdd = popupAdd.querySelector('.popup__close');
const formAdd = popupAdd.querySelector('.popup__body');
const namePlaceInpute = formAdd.querySelector('.popup__input_place-name');
const linkInput  = formAdd.querySelector('.popup__input_link');
const buttonSubmit = formAdd.querySelector('.popup__save');

//попап с картинкой
const popupView = document.querySelector('.popup_view');
const buttonClosePopupView = popupView.querySelector('.popup__close');
const imagePopupView = popupView.querySelector('.popup__image');
const subtitlePopupView = popupView.querySelector('.popup__subtitle');

//контейнер для вставки

const galleryConteiner = document.querySelector('.gallery__list');

//ФУНКЦИИ
//закрытие по нажатию ESC

const keydownEscHeandler = (evt) => {
  if(evt.key==='Escape'){
    closePopup(document.querySelector('.popup_opened'));
  }
};

//закрытие попапа по нажатию на оверлей
const clickPopupOverlayHeandler = (evt) => {
  if(evt.target===evt.currentTarget){
    closePopup(document.querySelector('.popup_opened'));
  }
};


//открытие и закрытие попапа

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', keydownEscHeandler);
  popup.addEventListener('click',clickPopupOverlayHeandler);
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', keydownEscHeandler);
  popup.removeEventListener('click',clickPopupOverlayHeandler);
};

//редактирование информации о себе

function formSubmitHandlerEdit(evt) {
  evt.preventDefault();
  if (nameInput.value != '' && jobInput.value !=''){
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
  }
  closePopup(popupEdit);
};

//добавление новой карточки
const formSubmitHandlerAdd = (evt)=> {
  evt.preventDefault();
  renderGalleryCard(
    {name: namePlaceInpute.value,
    link: linkInput.value}
  );
  closePopup(popupAdd);
};

//удаление карточки
const handlerDeleteGallaryCard = (evt) => {
  evt.target.closest('.gallery__item').remove();
};

//добавление лайка на карточку
const handlerLikeGallaryCard = (evt)=>{
  evt.target.closest('.gallery__like').classList.toggle('gallery__like_active')
};

//открытие попапа с картинкой

const handlerViewImageGallaryCard = (name, link)=> {
  imagePopupView.setAttribute('src', link);
  imagePopupView.setAttribute ('alt', name);
  subtitlePopupView.textContent = name;
  openPopup(popupView);
};


//генерация карточки

const generateGalleryCard = (galleryCard) => {
  const newGalleryCard = galleryCardTemlate.cloneNode(true);

  const titleGalleryCard = newGalleryCard.querySelector('.gallery__title');
  titleGalleryCard.textContent = galleryCard.name;

  const imageGalleryCard = newGalleryCard.querySelector('.gallery__image');
  imageGalleryCard.setAttribute('src', galleryCard.link);
  imageGalleryCard.setAttribute('alt', galleryCard.name);
  imageGalleryCard.addEventListener('click', function(evt) {
    if(evt.target===evt.currentTarget) {
      handlerViewImageGallaryCard(galleryCard.name,galleryCard.link);
    }
  }
  );

  const deleteButton = newGalleryCard.querySelector('.gallery__delete');
  deleteButton.addEventListener('click', handlerDeleteGallaryCard);

  const likeButton = newGalleryCard.querySelector('.gallery__like');
  likeButton.addEventListener('click', handlerLikeGallaryCard);


  return newGalleryCard;
};

//рендер карточки

const renderGalleryCard = (galleryCard)=>{
  galleryConteiner.prepend(generateGalleryCard(galleryCard));
};

initialCards.forEach((galleryCard) => {
  renderGalleryCard(galleryCard)
});



//ОБРАБОТЧИКИ СОБЫТИЙ
//обработчик нажатия на кнопку Реадактировать

buttonOpenPopupEdit.addEventListener('click', ()=>{
  if (!popupEdit.classList.contains('popup_opened')) {
    nameInput.value=nameProfile.textContent;
    jobInput.value=jobProfile.textContent;
  }
  openPopup(popupEdit);
}
);

//обработчик нажатия на кнопку закрыть редактирование профиля

buttonClosePopupEdit.addEventListener('click', ()=>{
  closePopup(popupEdit);
});

//обработчик нажатия на кнопку Добавить

buttonOpenPopupAdd.addEventListener('click', ()=>{
  if (!popupAdd.classList.contains('popup_opened')) {
    namePlaceInpute.value='';
    linkInput.value='';
  }
  openPopup(popupAdd);
  makeButtonIncative(buttonSubmit);
});

//обработчик нажатия на кнопку закрыть форму добаления карточки

buttonClosePopupAdd.addEventListener('click', ()=>{
  closePopup(popupAdd);
});

//обработчик отправки данных с формы редактирования

formEdit.addEventListener('submit', formSubmitHandlerEdit);

//обработчик отправки данных с формы добавления карточек
formAdd.addEventListener('submit', formSubmitHandlerAdd);


//закрытие попапа с картинкой
buttonClosePopupView.addEventListener('click', ()=>{
  closePopup(popupView);
});





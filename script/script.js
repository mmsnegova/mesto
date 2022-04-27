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

const openPopupEditButton = document.querySelector('.profile__edit');
const popupEdit = document.querySelector('.popup_edit');
const popupEditCloseButton = popupEdit.querySelector('.popup__close');
const formEdit = popupEdit.querySelector('.popup__body');
const nameInput = formEdit.querySelector('.popup__first-imput_name');
const jobInput  = formEdit.querySelector('.popup__second-input_job');
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__job');

//попап добавления карточек
const openPopupAddButton = document.querySelector('.profile__add');
const popupAdd= document.querySelector('.popup_add');
const popupAddCloseButton = popupAdd.querySelector('.popup__close');
const formAdd = popupAdd.querySelector('.popup__body');
const nameIPlaceInpute = formAdd.querySelector('.popup__first-imput_place-name');
const linkInput  = formAdd.querySelector('.popup__second-input_link');


//контейнер для вставки

const galleryConteiner = document.querySelector('.gallery__list');

//открытие и закрытие формы

function popupToggle(popup) {
  popup.classList.toggle('popup_opened');
}

//редактирование информации о себе

function formSubmitHandlerEdit(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  popupToggle(popupEdit);
}

//добавление новой карточки
const formSubmitHandlerAdd = (evt)=> {
  evt.preventDefault();
  renderGalleryCard(
    {name: nameIPlaceInpute.value,
    link: linkInput.value}
  );
  popupToggle(popupAdd);
};


//генерация карточки

const generateGalleryCard = (galleryCard) => {
  const newGalleryCard = galleryCardTemlate.cloneNode(true);

  const titleGalleryCard = newGalleryCard.querySelector('.gallery__title');
  titleGalleryCard.textContent = galleryCard.name;

  const imageGalleryCard = newGalleryCard.querySelector('.gallery__image');
  imageGalleryCard.setAttribute('style', `background-image:url(${galleryCard.link})`);

  return newGalleryCard;
}

//рендер карточки

const renderGalleryCard = (galleryCard)=>{
  galleryConteiner.prepend(generateGalleryCard(galleryCard));
}

for (index = initialCards.length - 1; index > -1; --index){
  renderGalleryCard(initialCards[index]);
}

/*initialCards.forEach((galleryCard) => {
  renderGalleryCard(galleryCard);
});*/


//ОБРАБОТЧИКИ СОБЫТИЙ
//обработчик нажатия на кнопку Реадактировать

openPopupEditButton.addEventListener('click', ()=>{
  if (!popupEdit.classList.contains('popup_opened')) {
    nameInput.value=nameProfile.textContent;
    jobInput.value=jobProfile.textContent;
  }
  popupToggle(popupEdit);
}
);

//обработчик нажатия на кнопку закрыть редактирование профиля

popupEditCloseButton.addEventListener('click', ()=>{
  popupToggle(popupEdit);
});

//обработчик нажатия на кнопку Добавить

openPopupAddButton.addEventListener('click', ()=>{
  if (!popupAdd.classList.contains('popup_opened')) {
    nameIPlaceInpute.value='';
    linkInput.value='';
  }
  popupToggle(popupAdd);
});

//обработчик нажатия на кнопку закрыть форму добаления карточки

popupAddCloseButton.addEventListener('click', ()=>{
  popupToggle(popupAdd);
});

//обработчик отправки данных с формы редактирования

formEdit.addEventListener('submit', formSubmitHandlerEdit);

//обработчик отправки данных с формы добавления карточек
formAdd.addEventListener('submit', formSubmitHandlerAdd);

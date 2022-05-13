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
const buttonSubmitFormEdit = formEdit.querySelector('.popup__save');

//попап добавления карточек
const buttonOpenPopupAdd = document.querySelector('.profile__add');
const popupAdd= document.querySelector('.popup_add');
const buttonClosePopupAdd = popupAdd.querySelector('.popup__close');
const formAdd = popupAdd.querySelector('.popup__body');
const namePlaceInpute = formAdd.querySelector('.popup__input_place-name');
const linkInput  = formAdd.querySelector('.popup__input_link');
const buttonSubmitFormAdd = formAdd.querySelector('.popup__save');

//попап с картинкой
const popupView = document.querySelector('.popup_view');
const buttonClosePopupView = popupView.querySelector('.popup__close');
const imagePopupView = popupView.querySelector('.popup__image');
const subtitlePopupView = popupView.querySelector('.popup__subtitle');

//контейнер для вставки

const galleryConteiner = document.querySelector('.gallery__list');

//ФУНКЦИИ
//закрытие по нажатию ESC

const heandleEscKeydown = (evt) => {
  if(evt.key==='Escape'){
    closePopup(document.querySelector('.popup_opened'));
  }
};

//закрытие попапа по нажатию на оверлей
const heandlePopupOverlayClick = (evt) => {
  if(evt.target===evt.currentTarget){
    closePopup(evt.target);
  }
};


//открытие и закрытие попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', heandleEscKeydown);
  popup.addEventListener('click',heandlePopupOverlayClick);
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', heandleEscKeydown);
  popup.removeEventListener('click',heandlePopupOverlayClick);
};

const handleOpenPopupEdit = ()=>{
  nameInput.value=nameProfile.textContent;
  jobInput.value=jobProfile.textContent;
  openPopup(popupEdit);
  hideError (popupEdit, nameInput, validationConfig);
  hideError (popupEdit, jobInput, validationConfig);
  makeButtonActive(buttonSubmitFormEdit, validationConfig);
}

const handleOpenPopupAdd = ()=>{
  formAdd.reset();
  hideError (popupAdd, namePlaceInpute, validationConfig);
  hideError (popupAdd, linkInput, validationConfig);
  openPopup(popupAdd);
}

//редактирование информации о себе
function handleProfileFormSubmit (evt) {
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  evt.preventDefault();
  closePopup(popupEdit);
};

//добавление новой карточки
const handleAddCardFormSubmit = (evt)=> {
  evt.preventDefault();
  renderGalleryCard(
    {name: namePlaceInpute.value,
    link: linkInput.value}
  );
  closePopup(popupAdd);
  makeButtonInactive(buttonSubmitFormAdd,validationConfig);
};

//удаление карточки
const handleGallaryCardDelete = (evt) => {
  evt.target.closest('.gallery__item').remove();
};

//добавление лайка на карточку
const handleGallaryCardLike = (evt)=>{
  evt.target.closest('.gallery__like').classList.toggle('gallery__like_active')
};

//открытие попапа с картинкой
const handleGallaryCardImageView = (name, link)=> {
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
  imageGalleryCard.addEventListener('click', () => {
      handleGallaryCardImageView(galleryCard.name,galleryCard.link);
    }
  );

  const deleteButton = newGalleryCard.querySelector('.gallery__delete');
  deleteButton.addEventListener('click', handleGallaryCardDelete);

  const likeButton = newGalleryCard.querySelector('.gallery__like');
  likeButton.addEventListener('click', handleGallaryCardLike);


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
buttonOpenPopupEdit.addEventListener('click', handleOpenPopupEdit);

//обработчик нажатия на кнопку закрыть редактирование профиля
buttonClosePopupEdit.addEventListener('click', ()=>{
  closePopup(popupEdit);
});

//обработчик нажатия на кнопку Добавить
buttonOpenPopupAdd.addEventListener('click', handleOpenPopupAdd);

//обработчик нажатия на кнопку закрыть форму добаления карточки
buttonClosePopupAdd.addEventListener('click', ()=>{
  closePopup(popupAdd);
});

//обработчик отправки данных с формы редактирования
formEdit.addEventListener('submit', handleProfileFormSubmit);

//обработчик отправки данных с формы добавления карточек
formAdd.addEventListener('submit', handleAddCardFormSubmit);

//закрытие попапа с картинкой
buttonClosePopupView.addEventListener('click', ()=>{
  closePopup(popupView);
});





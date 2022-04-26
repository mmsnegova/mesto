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

//открытие и закрытие формы редактирования профиля

function popupEditToggle() {
  if (!popupEdit.classList.contains('popup_opened')) {
    nameInput.value=nameProfile.textContent;
    jobInput.value=jobProfile.textContent;
  }

  popupEdit.classList.toggle('popup_opened');
}

//редактирование информации о себе

function formSubmitHandler(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  popupEditToggle();
}

//открытие и закрытие формы добавления карточки
function popupAddToggle() {
  popupAdd.classList.toggle('popup_opened');
}

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
  galleryConteiner.append(generateGalleryCard(galleryCard));
}

initialCards.forEach((galleryCard) => {
  renderGalleryCard(galleryCard);
});

openPopupEditButton.addEventListener('click', popupEditToggle);
popupEditCloseButton.addEventListener('click', popupEditToggle);
openPopupAddButton.addEventListener('click', popupAddToggle);
popupAddCloseButton.addEventListener('click', popupAddToggle);
formEdit.addEventListener('submit', formSubmitHandler);

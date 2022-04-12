const openPopupButton = document.querySelector('.profile__edit');
const popup = document.querySelector('.popup');
const popupCloseButton = popup.querySelector('.popup__close');
const popupSaveButton = popup.querySelector('.popup__save');

function popupOpenToggle() {
  popup.classList.toggle('popup_opened');
}

openPopupButton.addEventListener('click', popupOpenToggle);
popupCloseButton.addEventListener('click', popupOpenToggle);
popupSaveButton.addEventListener('click', popupOpenToggle);

let formElement = document.querySelector('.popup__content');

let nameInput = formElement.querySelector('.popup__name');
let jobInput  = formElement.querySelector('.popup__job');
let nameProfile=document.querySelector('.profile__name');
let jobProfile=document.querySelector('.profile__job');
nameInput.value=nameProfile.textContent;
jobInput.value=jobProfile.textContent;

function formSubmitHandler(evt) {
  evt.preventDefault();
  console.log(nameInput.value);
  console.log(jobInput.value);
  nameProfile.textContent=nameInput.value;
  jobProfile.textContent=jobInput.value;
}

formElement.addEventListener('submit', formSubmitHandler);

const openPopupButton = document.querySelector('.profile__edit');
const popup = document.querySelector('.popup');
const popupCloseButton = popup.querySelector('.popup__close');
const formElement = popup.querySelector('.popup__body');
const nameInput = formElement.querySelector('.popup__name');
const jobInput  = formElement.querySelector('.popup__job');
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__job');

function popupOpenAdd() {
  nameInput.value=nameProfile.textContent;
  jobInput.value=jobProfile.textContent;
  popup.classList.add('popup_opened');
}

function popupOpenRemove() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  popupOpenRemove();
}

openPopupButton.addEventListener('click', popupOpenAdd);
popupCloseButton.addEventListener('click', popupOpenRemove);
formElement.addEventListener('submit', formSubmitHandler);

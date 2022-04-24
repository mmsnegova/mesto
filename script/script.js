const openPopupButton = document.querySelector('.profile__edit');
const popup = document.querySelector('.popup');
const popupCloseButton = popup.querySelector('.popup__close');
const formElement = popup.querySelector('.popup__body');
const nameInput = formElement.querySelector('.popup__name');
const jobInput  = formElement.querySelector('.popup__job');
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__job');

function popupToggle() {
  if (!popup.classList.contains('popup_opened')) {
    nameInput.value=nameProfile.textContent;
    jobInput.value=jobProfile.textContent;
  }

  popup.classList.toggle('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  popupToggle();
}

openPopupButton.addEventListener('click', popupToggle);
popupCloseButton.addEventListener('click', popupToggle);
formElement.addEventListener('submit', formSubmitHandler);

let openButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');
let popup = document.querySelector('.popup');
let nameInput = document.querySelector('[name="name"]');
let jobInput = document.querySelector('[name="occupation"]');
let formElement = popup.querySelector('.popup__form');
let name = document.querySelector('.profile__title');
let job = document.querySelector('.profile__subtitle');

function openPopup() {
  popup.classList.toggle('popup_active');
  nameInput.value = name.textContent;
  jobInput.value = job.textContent;
}

function closePopup() {
  popup.classList.toggle('popup_active');
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;
  closePopup();
}

formElement.addEventListener('submit', handleFormSubmit);
openButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
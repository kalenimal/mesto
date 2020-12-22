let openButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');
let popup = document.querySelector('.popup');

function togglePopup() {
popup.classList.toggle('popup_active');
}

openButton.addEventListener('click', togglePopup);
closeButton.addEventListener('click', togglePopup);

let formElement = popup.querySelector('.popup__container');

function handleFormSubmit (evt) {
evt.preventDefault();

let nameInput = document.querySelector('[name="name"]');
let jobInput = document.querySelector('[name="occupation"]');

let name = document.querySelector('.profile__title');
let job = document.querySelector('.profile__subtitle');

name.textContent = nameInput.value;
job.textContent = jobInput.value;

togglePopup();
}


formElement.addEventListener('submit', handleFormSubmit);
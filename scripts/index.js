import {FormValidator} from "./validate.js";
import {initialCards} from './dataScript.js';
import {Card } from './card.js';

const openButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popupImg = document.querySelector('.popup_type_image');
const imageOfPopup = popupImg.querySelector('.popup__img');
const titleOfPopupImage = popupImg.querySelector('.image-title');
const createButton = document.querySelector('.add-button');
const popupEdit = document.querySelector('.popup_type_edit-profile');
const popupAdd = document.querySelector('.popup_type_add');
const nameInput = popupEdit.querySelector('input[name="name"]');
const jobInput = popupEdit.querySelector('input[name="occupation"]');
const formEdit = popupEdit.querySelector('.popup__form');
const formAdd = popupAdd.querySelector('.popup__form');
const name = document.querySelector('.profile__title');
const job = document.querySelector('.profile__subtitle');
const cardTemplate = document.querySelector('.template-card').content;
const cardsList = document.querySelector('.cards__items');
const imgTitleInput = popupAdd.querySelector('input[name="title"]');
const imgLinkInput = popupAdd.querySelector('input[name="Link"]');
const popups = document.querySelectorAll('.popup');
const initialReverse = initialCards.reverse();


const configValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}; 


//создает класс для валидации формы 
function doValidation() {
  const formList = Array.from(document.querySelectorAll(configValidation.formSelector));
  formList.forEach((form) => {
    const validation = new FormValidator(configValidation, form);
    validation.enableValidation ();
  }) 
}

doValidation()

//создает класс карты 
initialReverse.forEach((item) => {
  const newCard = new Card(item, '.template-card');
  const card = newCard.generateCard();

  cardsList.prepend(card);
})


//наполняет попап с картинкой
function fillPopup(link, name) {
  imageOfPopup.src = link;
  imageOfPopup.alt = name;
  titleOfPopupImage.textContent = name;
  openPopup(popupImg);
};

//открывает попап с редактированием профиля
function openPopupEdit() {
  nameInput.value = name.textContent;
  jobInput.value = job.textContent;
  openPopup(popupEdit)
}

//открывает попап с добавлением карточки
function openPopupAdd() {
  imgTitleInput.value = null;
  imgLinkInput.value = null;
  openPopup(popupAdd);
}
//открывает попап 
function openPopup(item) {
  item.classList.toggle('popup_active');
  document.addEventListener('keydown', escClosePopup);
}

//закрывает попап по нажатию на ESC
function escClosePopup (evt) {
    if (evt.keyCode === 27) {
      const openedPopup = document.querySelector('.popup_active');
      closePopup(openedPopup);
    }
}

//закрывает попап
function closePopup(item) {
  item.classList.remove('popup_active');
  document.removeEventListener('keydown', escClosePopup);
}

//закрывает попап по нажатию на оверлей и крестик
function closeByOverlayAndButton () {
  popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup_active')) {
        closePopup(popup);
      } if (evt.target.classList.contains('popup__close-button')) {
        closePopup(popup);
      }
    })
  })
}

closeByOverlayAndButton ();
//передает значения инпутов редактирования профиля в теги
function editFormSubmit(evt) {
  evt.preventDefault();
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;
  closePopup(popupEdit);
}

//передает значения инпутов новой карточки
function addFormSubmit(evt) {
  evt.preventDefault();
  const cardData = {};
  cardData.name = imgTitleInput.value;
  cardData.link = imgLinkInput.value;
  const newCard = new Card(cardData, '.template-card');
  const card = newCard.generateCard();

  cardsList.prepend(card);
  closePopup(popupAdd);
}


formAdd.addEventListener('submit', addFormSubmit);
formEdit.addEventListener('submit', editFormSubmit);
openButton.addEventListener('click', openPopupEdit);
addButton.addEventListener('click', openPopupAdd);




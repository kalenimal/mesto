import {FormValidator} from "./Validate.js";
import {initialCards} from './dataScript.js';
import {Card } from './Card.js';
import {Section} from './Section.js';
import {Popup} from './Popup.js';
import {PopupWithImage} from './PopupWithImage.js';
import {PopupWithForm} from './PopupWithForm.js';




const openButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popupEdit = document.querySelector('.popup_type_edit-profile');
const popupAdd = document.querySelector('.popup_type_add');
const nameInput = popupEdit.querySelector('input[name="name"]');
const jobInput = popupEdit.querySelector('input[name="occupation"]');
const formEdit = popupEdit.querySelector('.popup__form');
const formAdd = popupAdd.querySelector('.popup__form');
const name = document.querySelector('.profile__title');
const job = document.querySelector('.profile__subtitle');
const cardsList = document.querySelector('.cards__items');
const imgTitleInput = popupAdd.querySelector('input[name="name"]');
const imgLinkInput = popupAdd.querySelector('input[name="link"]');
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


//создает  карты из начального массива
const cardList = new Section ({items: initialReverse,
renderer: (cardItem) => {
  const newCard = new Card(cardItem, '.template-card');
  const card = newCard.generateCard();

  cardList.addItem(card);
}}, cardsList)

cardList.renderItems();

//создает новую карту из формы
const frmCard = new PopupWithForm (popupAdd, {handleFormSubmit: (data) => {
const card = new Card(data, '.template-card');
const newCard = card.generateCard();

cardList.addItem(newCard);
frmCard.close()
}})

frmCard.setEventListeners();



//создает класс для валидации формы 
function doValidation() {
  const formList = Array.from(document.querySelectorAll(configValidation.formSelector));
  formList.forEach((form) => {
    const validation = new FormValidator(configValidation, form);
    validation.enableValidation ();
  }) 
}

doValidation()


//открывает попап с редактированием профиля
function openPopupEdit() {
  nameInput.value = name.textContent;
  jobInput.value = job.textContent;
  openPopup(popupEdit)
}

//открывает попап с добавлением карточки
function openPopupAdd() {
  formAdd.reset();
  const submitButtonSelector = popupAdd.querySelector(configValidation.submitButtonSelector);
  submitButtonSelector.classList.add(configValidation.inactiveButtonClass);
  submitButtonSelector.setAttribute('disabled', 'disabled');
  openPopup(popupAdd);

}


//открывает попап 
export function openPopup(item) {

  item.classList.add('popup_active');
  document.addEventListener('keydown', escClosePopup);
}

//закрывает попап по нажатию на ESC
function escClosePopup (evt) {
    if (evt.key === "Escape") {
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
      if ((evt.target.classList.contains('popup_active')) || (evt.target.classList.contains('popup__close-button'))) {
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
/* function addFormSubmit(evt) {
  evt.preventDefault();
  const cardData = {};
  cardData.name = imgTitleInput.value;
  cardData.link = imgLinkInput.value;
  const newCard = new Card(cardData, '.template-card');
  const card = newCard.generateCard();

  cardsList.prepend(card);
  closePopup(popupAdd);
} */


//formAdd.addEventListener('submit', addFormSubmit);
formEdit.addEventListener('submit', editFormSubmit);
openButton.addEventListener('click', openPopupEdit);
addButton.addEventListener('click', openPopupAdd);





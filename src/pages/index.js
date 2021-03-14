import {FormValidator} from "../scripts/components/validate.js";
import {initialCards} from '../scripts/Utils/dataScript.js';
import {Card } from '../scripts/components/card.js';
import {Section} from '../scripts/components/Section.js';
import {Popup} from '../scripts/components/Popup.js';
import {PopupWithImage} from '../scripts/components/PopupWithImage.js';
import {PopupWithForm} from '../scripts/components/PopupWithForm.js';
import {UserInfo} from '../scripts/components/UserInfo.js';

const openButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popupEdit = document.querySelector('.popup_type_edit-profile');
const popupImg = document.querySelector('.popup_type_image');
const popupAdd = document.querySelector('.popup_type_add');
const nameInput = popupEdit.querySelector('input[name="name"]');
const jobInput = popupEdit.querySelector('input[name="info"]');
const name = document.querySelector('.profile__title');
const job = document.querySelector('.profile__subtitle');
const cardsList = document.querySelector('.cards__items');
const initialReverse = initialCards.reverse();


const configValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}; 

//создает класс попапа с картинкой
const imgPopup = new PopupWithImage (popupImg);
imgPopup.setEventListeners();



//создает  карты из начального массива
const cardList = new Section ({items: initialReverse,
renderer: (cardItem) => {
  const newCard = new Card(cardItem, '.template-card', {handleCardClick: (link, title) => {

    imgPopup.open(link, title);
  }});
  
  const card = newCard.generateCard();

  cardList.addItem(card);
}}, cardsList)

cardList.renderItems();

//создает новую карту из формы
const frmCard = new PopupWithForm (popupAdd, {handleFormSubmit: (data) => {
const card = new Card(data, '.template-card', {handleCardClick: (link, title) => {

  imgPopup.open(link, title);
}});
const newCard = card.generateCard();

cardList.addItem(newCard);
frmCard.close();

}})

frmCard.setEventListeners();


//создает класс для отображения инфо о пользователе
const newUsrInf = new UserInfo ({name: name, info: job});

//добавляет информацию о пользователе
const userInfo = new PopupWithForm (popupEdit, {handleFormSubmit: (data) => {

  newUsrInf.setUserInfo(data);
  userInfo.close();
}})

 
userInfo.setEventListeners();



//создает класс для валидации формы 
function doValidation() {
  const formList = Array.from(document.querySelectorAll(configValidation.formSelector));
  formList.forEach((form) => {
    const validation = new FormValidator(configValidation, form);
    validation.enableValidation ();
  }) 
}

doValidation()


openButton.addEventListener('click', () => {userInfo.open();
  jobInput.value = newUsrInf.getUserInfo().info;
  nameInput.value = newUsrInf.getUserInfo().name});
addButton.addEventListener('click', () => {frmCard.open();
  const submitButtonSelector = popupAdd.querySelector(configValidation.submitButtonSelector);
  submitButtonSelector.classList.add(configValidation.inactiveButtonClass);
  submitButtonSelector.setAttribute('disabled', 'disabled')});





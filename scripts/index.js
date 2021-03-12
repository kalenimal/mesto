import {FormValidator} from "./Validate.js";
import {initialCards} from './dataScript.js';
import {Card } from './Card.js';
import {Section} from './Section.js';
import {Popup} from './Popup.js';
import {PopupWithImage} from './PopupWithImage.js';
import {PopupWithForm} from './PopupWithForm.js';
import {UserInfo} from './UserInfo.js';




const openButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popupEdit = document.querySelector('.popup_type_edit-profile');
const popupImg = document.querySelector('.popup_type_image');
const popupAdd = document.querySelector('.popup_type_add');
const nameInput = popupEdit.querySelector('input[name="name"]');
const jobInput = popupEdit.querySelector('input[name="info"]');
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

//создает класс попапа с картинкой
const imgPopup = new PopupWithImage (popupImg);

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
frmCard.close()
}})

frmCard.setEventListeners();


//создает класс для отображения инфо о пользователе
const newUsrInf = new UserInfo ({name: name, info: job});

//добавляет информацию о пользователе
const userInfo = new PopupWithForm (popupEdit, {handleFormSubmit: (data) => {

  newUsrInf.setUserInfo(data);
  userInfo.close()
  
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



openButton.addEventListener('click', () => {userInfo.open()});
addButton.addEventListener('click', openPopupAdd);





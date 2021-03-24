import {FormValidator} from "../scripts/components/FormValidator.js";
import {Card } from '../scripts/components/Card.js';
import {Section} from '../scripts/components/Section.js';
import {Popup} from '../scripts/components/Popup.js';
import {PopupWithImage} from '../scripts/components/PopupWithImage.js';
import {PopupWithForm} from '../scripts/components/PopupWithForm.js';
import {UserInfo} from '../scripts/components/UserInfo.js';
import './index.css';
import {PopupWithSubmit} from '../scripts/components/PopupWithSubmit.js';
import {Api} from '../scripts/components/Api.js'

 

const openButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popupEdit = document.querySelector('.popup_type_edit-profile');
const popupImg = document.querySelector('.popup_type_image');
const popupAdd = document.querySelector('.popup_type_add');
const popupAvatar =document.querySelector('.popup_type_avatar')
const nameInput = popupEdit.querySelector('input[name="name"]');
const jobInput = popupEdit.querySelector('input[name="info"]');
const name = document.querySelector('.profile__title');
const job = document.querySelector('.profile__subtitle');
const avatar = document.querySelector('.profile__image');
const cardsList = document.querySelector('.cards__items');
const editProfile = document.querySelector('.profile__avatar');


const configValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}; 

export const apiConfig = {
  authorization: 'a10c20b5-d633-4210-97f7-ee085e6f283f'
}

//создает класс api
const api = new Api (apiConfig);

//берет данные о пользователе с сервера
api.getUserInfo()
.then ((res) => {
  newUsrInf.setUserInfo(res);
})

//берет данные о карточкаx с сервера 
api.getIntlCards()
.then (res => {
  cardList.renderItems(res.reverse());
})

//создает класс попапа с сабмитом
const popupSubmit = new PopupWithSubmit ('.popup_type_delete', () => {
  popupSubmit.close();
})

popupSubmit.setEventListeners();


//меняет картинку аватара
function changeAvatar(data, imageSelector) {
const image = document.querySelector(imageSelector)
image.src = data.link
}

//меняет аватар
const newAvatar = new PopupWithForm('.popup_type_avatar', {handleFormSubmit: (data) => {
  changeAvatar(data, '.profile__image')
  
  newAvatar.close();
  }})

  newAvatar.setEventListeners();

//создает класс попапа с картинкой
const imgPopup = new PopupWithImage ('.popup_type_image');
imgPopup.setEventListeners();


//создает карточку 
function createCard(data) {
  const card = new Card(data, '.template-card', {handleCardClick: (link, title) => {

    imgPopup.open(link, title);
  },
   handleTrashClick: () => {
    popupSubmit.open();
   }});

  return card.generateCard()

}
//создает  карты из начального массива
const cardList = new Section ({renderer: (cardItem) => {

  cardList.addItem(createCard(cardItem));
}}, cardsList)



//создает новую карту из формы
const frmCard = new PopupWithForm ('.popup_type_add', {handleFormSubmit: (data) => {

api.postCard(data)

cardList.addItem(createCard(data));

frmCard.close();

}})

frmCard.setEventListeners();


//создает класс для отображения инфо о пользователе
const newUsrInf = new UserInfo ({name: name, info: job, avatar: avatar});

//добавляет информацию о пользователе
const userInfo = new PopupWithForm ('.popup_type_edit-profile', {handleFormSubmit: (data) => {
  newUsrInf.setUserInfo(data);
  api.changeProf(data);
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
editProfile.addEventListener('click', ()=> {newAvatar.open();
  const submitButtonSelector = popupAvatar.querySelector(configValidation.submitButtonSelector);
  submitButtonSelector.classList.add(configValidation.inactiveButtonClass);
  submitButtonSelector.setAttribute('disabled', 'disabled')
})





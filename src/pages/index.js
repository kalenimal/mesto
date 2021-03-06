import {FormValidator} from "../scripts/components/FormValidator.js";
import {Card } from '../scripts/components/Card.js';
import {Section} from '../scripts/components/Section.js';

import {PopupWithImage} from '../scripts/components/PopupWithImage.js';
import {PopupWithForm} from '../scripts/components/PopupWithForm.js';
import {UserInfo} from '../scripts/components/UserInfo.js';
import './index.css';
import {PopupWithSubmit} from '../scripts/components/PopupWithSubmit.js';
import {Api} from '../scripts/components/Api.js'

 

const openButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popupEdit = document.querySelector('.popup_type_edit-profile');
const popupAdd = document.querySelector('.popup_type_add');
const popupAvatar =document.querySelector('.popup_type_avatar')
const nameInput = popupEdit.querySelector('input[name="name"]');
const jobInput = popupEdit.querySelector('input[name="about"]');
const name = document.querySelector('.profile__title');
const job = document.querySelector('.profile__subtitle');
const avatar = document.querySelector('.profile__image');
const cardsList = document.querySelector('.cards__items');
const editProfile = document.querySelector('.profile__avatar');
export let myId = {};

const configValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}; 

export const apiConfig = {
  authorization: 'a10c20b5-d633-4210-97f7-ee085e6f283f',
  url: 'https://mesto.nomoreparties.co/v1/cohort-21/'
}

//создает класс api
const api = new Api (apiConfig);

api.getAllData().then(data => {
  const [userData, cardsData] = data;
  newUsrInf.setUserInfo(userData);
  myId = userData._id;
  cardList.renderItems(cardsData.reverse());
})



//меняет картинку аватара
function changeAvatar(data, imageSelector) {
const image = document.querySelector(imageSelector)
image.src = data.avatar
}

//меняет аватар
const newAvatar = new PopupWithForm('.popup_type_avatar', {handleFormSubmit: (data) => {
  api.changeAva(data)

  .then (res => {
    changeAvatar(res, '.profile__image')
    newAvatar.close();
    popupAvatar.querySelector('.add-button').value = 'сохранить'  
  })
  .then (popupAvatar.querySelector('.add-button').value = 'сохранение...')
  
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
   handleTrashClick: (data) => {
    popupSubmit.open();
    popupSubmit.setEventListeners(data) 
   },
   handleLikeClick: (data, likes, myId) => {
     if (likes.some(el => el._id === myId)){
     api.deleteLike(data)
     .then(res => {
      card._handleLike(res.likes.length);
      card.getLikes(res)
     })
     
   } else {
    api.postLike(data)
    .then (res => {
      card._handleLike(res.likes.length);
      card.getLikes(res)
    })
    
   }
  }
  });

  //создает класс попапа с сабмитом
const popupSubmit = new PopupWithSubmit ('.popup_type_delete', {handleSubmit: (cardId) => {
  api.deleteCard(cardId)
  .then(card._handleDelete())
   popupSubmit.close(); 
}})

   
  

  return card.generateCard(myId)

}
//создает  карты из начального массива
const cardList = new Section ({renderer: (cardItem) => {

  cardList.addItem(createCard(cardItem));
}}, cardsList)



//создает новую карту из формы
const frmCard = new PopupWithForm ('.popup_type_add', {handleFormSubmit: (data) => {

api.postCard(data) 

.then ((res) => {
   cardList.addItem(createCard(res)) ;
   frmCard.close();
   popupAdd.querySelector('.add-button').value = 'создать'
})
.then (popupAdd.querySelector('.add-button').value = 'сохранение...')



}})

frmCard.setEventListeners();


//создает класс для отображения инфо о пользователе
const newUsrInf = new UserInfo ({name: name, info: job, avatar: avatar});

//добавляет информацию о пользователе
const userInfo = new PopupWithForm ('.popup_type_edit-profile', {handleFormSubmit: (data) => {
  api.changeProf(data)
  .then (res => {
    newUsrInf.setUserInfo(res);
    userInfo.close();
    popupEdit.querySelector('.add-button').value = 'сохранить'
    
  })
  .then (popupEdit.querySelector('.add-button').value = 'сохранение...') 
  
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
  jobInput.value = newUsrInf.getUserInfo().about;
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





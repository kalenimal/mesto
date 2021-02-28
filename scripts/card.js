import {openPopup} from './index.js';


//класс для создания карты
export class Card {
  constructor (data, cardSelector) {
    this._title = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  } 
  
  //возвращает разметку
  _getTemplate () {
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.cards__item')
    .cloneNode(true)
  
    return cardElement;
  }  
  
  //наполняет карту данными
  generateCard () {
  this._element = this._getTemplate ();
  const cardsImage = this._element.querySelector('.cards__image');
  this._element.querySelector('.cards__title').textContent = this._title;
  cardsImage.src = this._link;
  cardsImage.alt = this._title;
  
  this._setEventListeners ()
  
  return this._element;
  }

  //наполняет попап с картинкой
  _fillPopup(link, name) {
    const popupImg = document.querySelector('.popup_type_image');
    const popupImageTitle = popupImg.querySelector('.popup__img');

    popupImageTitle.src = link;
    popupImageTitle.alt = name;
    popupImg.querySelector('.image-title').textContent = name;
    openPopup(popupImg);
  }
  //ставит лайк
  _handleLike () {
    this._element.querySelector('.cards__like-button').classList.toggle('cards__like-button_active');
  }
  
  //удаляет карту 
  _handleDelete () {
    this._element.querySelector('.cards__delet-button').closest('.cards__item').remove();
  }
  
  //навешивает слушатели 
  _setEventListeners () {
    this._element.querySelector('.cards__like-button').addEventListener('click',() => {
     this._handleLike ();
    });
  
    this._element.querySelector('.cards__delet-button').addEventListener('click', () =>{
      this._handleDelete ();
    });
  
    this._element.querySelector('.cards__image').addEventListener('click', () => {
      this._fillPopup(this._link, this._title);
    })
  }
  }

  

  
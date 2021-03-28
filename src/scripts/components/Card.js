import {myId} from '../../pages/index.js'

//класс для создания карты
export class Card {
  constructor (data, cardSelector, {handleCardClick, handleTrashClick, handleLikeClick}) {
    this._title = data.name;
    this._link = data.link;
    this._owner = data.owner._id;
    this._cardId = data._id;
    this._data = data;
    this._likesAmount = data.likes.length; 
    this._cardSelector = cardSelector;
    this.handleCardClick = handleCardClick;
    this.handleTrashClick = handleTrashClick;
    this.handleLikeClick = handleLikeClick;
    this._element = this._getTemplate ();
    this._likeButton = this._element.querySelector('.cards__like-button');
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
  generateCard (id) {
    if (this._data.likes.some(el => el._id === myId)){
      this._likeButton.classList.add('cards__like-button_active');
    } else {
      this._likeButton.classList.remove('cards__like-button_active');
    }
  const cardsImage = this._element.querySelector('.cards__image');
  this._element.querySelector('.cards__title').textContent = this._title;
  this._element.querySelector('.cards__likes-counter').textContent = this._likesAmount;
  cardsImage.src = this._link;
  cardsImage.alt = this._title;
  
  this._deletTrash(id);
  this._setEventListeners (id);
  
  return this._element;
  }

  //ставит лайк
  _handleLike (res) {
    const likesCounter = this._element.querySelector('.cards__likes-counter');
    if (this._likeButton.classList.contains('cards__like-button_active')){
      this._likeButton.classList.remove('cards__like-button_active');
      likesCounter.textContent = res;
    } else {
      this._likeButton.classList.add('cards__like-button_active');
      likesCounter.textContent = res;
    }
  }

getLikes(res) {
  this._data = res;
}
  
  //удаляет карту фронт
   _handleDelete () {
    this._element.querySelector('.cards__delet-button').closest('.cards__item').remove();
  } 

  //
  
  //удаляет корзины с чужих карт
_deletTrash(id) {
  if (id !== this._owner) {
    this._element.querySelector('.cards__delet-button').remove();
  }
}

  //навешивает слушатели 
  _setEventListeners (id) {
    this._element.querySelector('.cards__like-button').addEventListener('click',() => {
 /*     this._handleLike (); */
     this.handleLikeClick(this._cardId, this._data.likes, myId);
    });
  if (id === this._owner) {
    this._element.querySelector('.cards__delet-button').addEventListener('click',()=> { this.handleTrashClick(this._cardId)})

  }
    this._element.querySelector('.cards__image').addEventListener('click', () => {
      this.handleCardClick(this._link, this._title);
    });

  }
  }
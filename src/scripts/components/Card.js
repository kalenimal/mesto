//класс для создания карты
export class Card {
  constructor (data, cardSelector, {handleCardClick, handleTrashClick}) {
    this._title = data.name;
    this._link = data.link;
    this._owner = data.owner._id;
    this._cardId = data._id;
    this._likesAmount = data.likes.length; 
    this._cardSelector = cardSelector;
    this.handleCardClick = handleCardClick;
    this.handleTrashClick = handleTrashClick;
    this._element = this._getTemplate ();
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
  _handleLike () {
    this._element.querySelector('.cards__like-button').classList.toggle('cards__like-button_active');
  }
  
  //удаляет карту 
 /*   _handleDelete () {
    this._element.querySelector('.cards__delet-button').closest('.cards__item').remove();
  }  */

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
     this._handleLike ();
    });
  if (id === this._owner) {
    this._element.querySelector('.cards__delet-button').addEventListener('click',()=> { this.handleTrashClick(this._cardId)})

  }
    this._element.querySelector('.cards__image').addEventListener('click', () => {
      this.handleCardClick(this._link, this._title);
    });

  }
  }
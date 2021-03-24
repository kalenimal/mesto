//класс для создания карты
export class Card {
  constructor (data, cardSelector, {handleCardClick, handleTrashClick}) {
    this._title = data.name;
    this._link = data.link;
    this._likesAmount = data.likes.length; 
    this._cardSelector = cardSelector;
    this.handleCardClick = handleCardClick;
    this.handleTrashClick = handleTrashClick;
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
  this._element.querySelector('.cards__likes-counter').textContent = this._likesAmount;
  cardsImage.src = this._link;
  cardsImage.alt = this._title;
  
  this._setEventListeners ()
  
  return this._element;
  }

  //ставит лайк
  _handleLike () {
    this._element.querySelector('.cards__like-button').classList.toggle('cards__like-button_active');
  }
  
  //удаляет карту 
  _handleDelete () {
    this._element.querySelector('.cards__delet-button').addEventListener('click', this.handleTrashClick);
    /* this._element.querySelector('.cards__delet-button').closest('.cards__item').remove(); */
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
      this.handleCardClick(this._link, this._title);
    })
  }
  }
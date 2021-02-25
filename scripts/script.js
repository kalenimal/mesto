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

//класс для создания карты
class Card {
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
this._element.querySelector('.cards__title').textContent = this._title;
this._element.querySelector('.cards__image').src = this._link;
this._element.querySelector('.cards__image').alt = this._title;

this._setEventListeners ()

return this._element;
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
    fillPopup(this._link, this._title);
  })
}
}

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




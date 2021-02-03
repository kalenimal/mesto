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


//создает карту
function createCard(el) {
  const card = cardTemplate.cloneNode(true);
  const cardTitle = card.querySelector('.cards__title');
  const cardImage = card.querySelector('.cards__image');
  const cardDeleteButton = card.querySelector('.cards__delet-button');
  const likeButton = card.querySelector('.cards__like-button');
  cardTitle.textContent = el.name;
  cardImage.src = el.link;
  cardImage.alt = el.name;
  cardImage.addEventListener('click', () => fillPopup(el));
  cardDeleteButton.addEventListener('click', handleDelete);
  likeButton.addEventListener('click', like);
  return card;
}

//добавляет карту 
function addCard(data, place) {
  const card = createCard(data);
  place.prepend(card);
}


//наполняет попап с картинкой
function fillPopup(item) {
  imageOfPopup.src = item.link;
  imageOfPopup.alt = item.name;
  titleOfPopupImage.textContent = item.name;
  openPopup(popupImg);
};

//создает карты из начального массива
function createInitialCards() {
  const initialReverse = initialCards.reverse();
  initialReverse.forEach(createCard);
  initialReverse.forEach((el) => {
    addCard(el, cardsList);
  });
}
createInitialCards();

//удаляет карточку
function handleDelete(evt) {
  evt.target.closest('.cards__item').remove();
}

//ставит лайк
function like(evt) {
  evt.target.classList.toggle('cards__like-button_active');
}

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
  const newCard = {};
  newCard.name = imgTitleInput.value;
  newCard.link = imgLinkInput.value;
  createCard(newCard);
  addCard(newCard, cardsList);
  closePopup(popupAdd);
}


formAdd.addEventListener('submit', addFormSubmit);
formEdit.addEventListener('submit', editFormSubmit);
openButton.addEventListener('click', openPopupEdit);
addButton.addEventListener('click', openPopupAdd);




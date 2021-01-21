const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }];
const openButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popupImg = document.querySelector('.popup__image');
const imageOfPopup = document.querySelector('.popup__img');
const titleOfPopupImage = document.querySelector('.image-title');
const createButton = document.querySelector('.add-button');
const closeButtonEdit = document.querySelector('.close-edit');
const closeButtonAdd = document.querySelector('.close-add');
const closeButtonImg = document.querySelector('.close-img');
const likeButton = document.querySelector('.cards__like-button');
const popupEdit = document.querySelector('.popup__edit-profile');
const popupAdd = document.querySelector('.popup__add');
const nameInput = document.querySelector('[name="name"]');
const jobInput = document.querySelector('[name="occupation"]');
const formEdit = document.querySelector('.edit-form');
const formAdd = document.querySelector('.add-form');
const name = document.querySelector('.profile__title');
const job = document.querySelector('.profile__subtitle');
const cardTemplate = document.querySelector('.template-card').content;
const cardsList = document.querySelector('.cards__items');
const imgTitleInput = document.querySelector('[name="title"]');
const imgLinkInput = document.querySelector('[name="Link"]');
const newCard = { name: "", link: "" };

//создает карту
function createCard(el) {
  const card = cardTemplate.cloneNode(true);
  card.querySelector('.cards__title').textContent = el.name;
  card.querySelector('.cards__image').src = el.link;
  setListeners(card, el);
  cardsList.prepend(card);
}

//вешает слушатели
function setListeners(ele, el) {
  ele.querySelector('.cards__delet-button').addEventListener('click', handleDelete);
  ele.querySelector('.cards__image').addEventListener('click', () => fillPopup(el));
  ele.querySelector('.cards__like-button').addEventListener('click', like);
}

//наполняет попап с картинкой
function fillPopup(item) {
  imageOfPopup.src = item.link;
  titleOfPopupImage.textContent = item.name;
  openPopup(popupImg);
};

//создает карты из начального массива
function createInitialCards() {
  const initialReverse = initialCards.reverse();
  initialReverse.forEach(createCard);
}
createInitialCards();

//удаляет карточку
function handleDelete(evt) {
  evt.target.closest('.cards__item').remove();
}

//ставит лайк
function like(evt) {
  evt.target.closest('.cards__like-button').classList.toggle('cards__like-button_active');
}

//открывает попап с редактированием профиля
function openPopupEdit() {
  nameInput.value = name.textContent;
  jobInput.value = job.textContent;
  openPopup(popupEdit)
}

//открывает попап 
function openPopup(item) {
  item.classList.toggle('popup_active');
}

//закрывает попап
function closePopup(item) {
  item.classList.remove('popup_active');
}

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
  newCard.name = imgTitleInput.value;
  newCard.link = imgLinkInput.value;
  createCard(newCard);
  closePopup(popupAdd);
}


formAdd.addEventListener('submit', addFormSubmit);
formEdit.addEventListener('submit', editFormSubmit);
openButton.addEventListener('click', openPopupEdit);
addButton.addEventListener('click', () => { openPopup(popupAdd) });
closeButtonEdit.addEventListener('click', () => closePopup(popupEdit) );
closeButtonAdd.addEventListener('click', () => closePopup(popupAdd));
closeButtonImg.addEventListener('click', () => closePopup(popupImg));



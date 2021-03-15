import {Popup} from './Popup.js';

//открывает попап с картинкой
export class PopupWithImage extends Popup {
    constructor(popupSelector) {
      super(popupSelector)
      this._popupImg = document.querySelector(popupSelector);
      this._image = this._popupImg.querySelector('.popup__img');
      this._title = this._popupImg.querySelector('.image-title');
    }
    open(link, name) {
      super.open();
  
      this._image.src = link;
      this._image.alt = name;
      this._title.textContent = name;
    }
    
  }
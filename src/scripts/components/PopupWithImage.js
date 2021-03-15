import {Popup} from './Popup.js';

//открывает попап с картинкой
export class PopupWithImage extends Popup {
    constructor(popupSelector) {
      super(popupSelector)
      this._image = this._popup.querySelector('.popup__img');
      this._title = this._popup.querySelector('.image-title');
    }
    open(link, name) {
      super.open();
  
      this._image.src = link;
      this._image.alt = name;
      this._title.textContent = name;
    }
    
  }
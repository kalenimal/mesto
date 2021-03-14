import {Popup} from './Popup.js';

//открывает попап с картинкой
export class PopupWithImage extends Popup {
    constructor(popupSelector) {
      super(popupSelector)
    }
    open(link, name) {
      super.open();
      const popupImg = document.querySelector('.popup_type_image');
      const popupImageTitle = popupImg.querySelector('.popup__img');
  
      popupImageTitle.src = link;
      popupImageTitle.alt = name;
      popupImg.querySelector('.image-title').textContent = name;
    }
    
  }
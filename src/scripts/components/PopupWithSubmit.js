import {Popup} from './Popup.js';

//открывает попап с подтверждением
export class PopupWithSubmit extends Popup {
  setEventListeners(){
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) =>{
      evt.preventDefault();
      
  });
  }
}
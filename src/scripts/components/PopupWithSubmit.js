import {Popup} from './Popup.js';

//открывает попап с подтверждением
export class PopupWithSubmit extends Popup {
  constructor (popupSelector,  {handleSubmit}){
    super(popupSelector);
    this.handleSubmit = handleSubmit;
    }
  setEventListeners(data){
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) =>{
      evt.preventDefault();
      this.handleSubmit(data);
  });
  }

}
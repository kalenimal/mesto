//открывает и закрывает попап
export class Popup {
    constructor(popupSelector) {
      this._popupSelector = popupSelector;
    }
    open() {
      this._popupSelector.classList.add('popup_active');
    document.addEventListener('keydown', this.__handleEscClose);
    }
  
    close() {
      this._popupSelector.classList.remove('popup_active');
    document.removeEventListener('keydown', this.__handleEscClose);
    }
    _handleEscClose(evt) {
      if (evt.key === "Escape") {
        this.close;
      }
    }
    setEventListeners() {
      this._popupSelector.addEventListener('click', (evt) => {
        if ((evt.target.classList.contains('popup_active')) || (evt.target.classList.contains('popup__close-button'))) {
          this.close;
        }
      })
    }
  }
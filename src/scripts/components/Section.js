//отрисовывает элемент на странице 
export class Section {
    constructor({renderer}, contSel) {
      this._contSel = contSel;
      this._renderer = renderer;
    }
    renderItems(items) {
      this._InitialItems = items;
      this._InitialItems.forEach((item) => {
        this._renderer(item);
      })
    }
    addItem(el) {
      this._contSel.prepend(el);
    }
  }
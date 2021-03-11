//отрисовывает элемент на странице 
export class Section {
    constructor({items, renderer}, contSel) {
      this._InitialItems = items;
      this._contSel = contSel;
      this._renderer = renderer;
    }
    renderItems() {
      this._InitialItems.forEach((item) => {
        this._renderer(item);
      })
    }
    addItem(el) {
      this._contSel.prepend(el);
    }
  }
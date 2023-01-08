// parent class for view classes
export default class View {
  _data;

  // Method for rendering data
  render(data) {
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  // Clear content of _parentElement
  _clear() {
    this._parentElement.innerHTML = "";
  }
}

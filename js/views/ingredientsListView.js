// import View from "./View.js";

class IngredientsListView {
  _parentElement = document.querySelector("#ingredients__list");
  _data;

  // Event listener trigers handler when window is loaded
  addHandlerOnWindowLoad(handler) {
    window.addEventListener("load", handler);
  }

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

  // Joining generated HTMLs for many meals in _data
  _generateMarkup() {
    console.log(this._data);
    return this._data
      .map(
        (ingredient) =>
          `<li>${ingredient.name} ${ingredient.amount} ${ingredient.measure}</li>`
      )
      .join("");
  }

  // generuje htmla dla jednego składnika listy zakupów
  _generateMarkupItem(ingredient) {
    return `
    <li>${ingredient.name}${ingredient.amount}${ingredient.measure}</li>
    `;
  }
}

export default new IngredientsListView();

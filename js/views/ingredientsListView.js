import View from "./View.js";

class IngredientsListView extends View {
  _parentElement = document.querySelector(".ingredients__list");

  // generuje htmla dla jednego składnika listy zakupów
  _generateMarkupItem(ingredient) {
    return `
    <li
        class="list-group-item d-flex justify-content-between align-items-center"
      >
        <div>${ingredient.name}</div>
        <span class="badge badge-primary badge-pill">${ingredient.amount} ${ingredient.measure}</span>
      </li>
    `;
  }
}

export default new IngredientsListView();

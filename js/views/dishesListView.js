import View from "./View.js";

class DishesListView extends View {
  _parentElement = document.querySelector(".dishes__list");

  // handler na przycisk 'Wyczyść listę dań'
  addHandlerOnCleanBtn(handler) {
    const cleanBtn = document.querySelector("#clean");
    cleanBtn.addEventListener("click", handler);
  }

  _generateMarkupItem(bookmark) {
    return `
    <li
    class="list-group-item d-flex justify-content-between align-items-center"
  >
    <div>${bookmark.name}</div>
    <span class="badge badge-primary badge-pill">${bookmark.servings}</span>
  </li>
    `;
  }
}

export default new DishesListView();

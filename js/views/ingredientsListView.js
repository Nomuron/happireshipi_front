import View from "./View.js";

class IngredientsListView extends View {
  _parentElement = document.querySelector(".ingredients__list");

  _generateMarkupItem(bookmark) {
    return `
    <li
        class="list-group-item d-flex justify-content-between align-items-center"
      >
        <div>Nazwa dania</div>
        <span class="badge badge-primary badge-pill">14</span>
      </li>
    `;
  }
}

export default new IngredientsListView();

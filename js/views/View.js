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

  // Event listener trigers handler when window is loaded
  addHandlerOnWindowLoad(handler) {
    window.addEventListener("load", handler);
  }

  // Joining generated HTMLs for many meals in _data
  _generateMarkup() {
    return this._data.map(this._generateMarkupItem).join("");
  }

  // handler for using buttons
  addHandlerOnMealButtons() {
    // znajduje wszystkie grupy przycisków z głównej strony
    const addToListGroupNodeList =
      this._parentElement.querySelectorAll(".addToListGroup");

    // dodaje handlery do każdej grupy przycisków
    addToListGroupNodeList.forEach(this._addHandlerOnMealButtons);
  }

  // dodaje event listenery do każdego przycisku z każdej grupy przycisków z osobna
  _addHandlerOnMealButtons(node) {
    // selectors for meal buttons and input
    const btnMinus = node.querySelector(".btn--minus");
    const btnPlus = node.querySelector(".btn--plus");
    const inputQuantity = node.querySelector(".quantity");
    const btnAddToList = node.querySelector(".addToList");

    // event listener for minus button
    btnMinus.addEventListener("click", function () {
      if (Number(inputQuantity.value) > 1) {
        inputQuantity.value = String(Number(inputQuantity.value) - 1);
        btnAddToList.dataset.mealServings = inputQuantity.value;
      }
    });

    // event listener for plus button
    btnPlus.addEventListener("click", function () {
      if (Number(inputQuantity.value) < 100) {
        inputQuantity.value = String(Number(inputQuantity.value) + 1);
        btnAddToList.dataset.mealServings = inputQuantity.value;
      }
    });
  }

  // osobny handler na Dodaj do listy
  addHandlerAddToList(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btnAddToList = e.target.closest(".addToList");

      if (!btnAddToList) return;

      // pobierz id
      const mealId = btnAddToList.dataset.mealId;

      // pobierz nazwę dania
      const mealName = btnAddToList.dataset.mealName;

      // pobierz ilość porcji
      const mealServings = btnAddToList.dataset.mealServings;

      // utwórz obiekt
      const mealToListObject = {
        id: mealId,
        name: mealName,
        servings: mealServings,
      };

      handler(mealToListObject);
    });
  }
}

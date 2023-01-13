import View from "./View";

// view for generating meal items for main
class MainView extends View {
  _parentElement = document.querySelector(".meal__list");

  // Event listener trigers handler when window is loaded
  addHandlerOnWindowLoad(handler) {
    window.addEventListener("load", handler);
  }

  // handler for using buttons
  addHandlerOnMealButtons() {
    // znajduje wszystkie grupy przycisków z głównej strony
    const addToListGroupNodeList =
      this._parentElement.querySelectorAll(".addToListGroup");

    // dodaje handlery do każdej grupy przycisków
    addToListGroupNodeList.forEach(this._addHandlerOnMealButtons);
  }

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
      // const addToListGroup = e.target.closest(".addToListGroup");
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

  // Joining generated HTMLs for many meals in _data
  _generateMarkup() {
    return this._data.map(this._generateMarkupItem).join("");
  }

  // Here you generate HTML for one meal
  _generateMarkupItem(meal) {
    return `
        <div class="col-md-4 col-sm-6 portfolio-item">
        <div class="card">
        <a
            class="portfolio-link"
            data-toggle="modal"
            href="#portfolioModal${meal.id}"
        >
            <div class="portfolio-hover">
            <div class="portfolio-hover-content"></div>
            </div>
            <img src="${meal.imageDirectory}" alt="" class="img-fluid" />
        </a>

        <div class="portfolio-caption">
            <h2 class="">${meal.name}</h2>
            <p class="text-muted">${meal.perPortionCalories} kcal/porcja</p>

            <div
            class="btn-toolbar justify-content-between"
            role="toolbar"
            aria-label="Toolbar with button groups"
            >
            <div class="btn-group" role="group"></div>

            <div class="input-group btn-group addToListGroup">
                <div class="input-group-prepend">
                <button class="btn btn-primary btn--minus" type="button">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-dash-lg"
                    viewBox="0 0 16 16"
                    >
                    <path
                        fill-rule="evenodd"
                        d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z"
                    />
                    </svg>
                </button>
                </div>

                <input
                id='quantity'
                type="text"
                class="quantity"
                value="1"
                aria-label=""
                min="1"
                />

                <div class="input-group-prepend">
                <button class="btn btn-primary btn--plus" type="button">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-plus-lg"
                    viewBox="0 0 16 16"
                    >
                    <path
                        fill-rule="evenodd"
                        d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
                    />
                    </svg>
                </button>
                </div>

                <div class="input-group-prepend">
                <button
                    class="btn btn-primary addToList"
                    data-meal-id="${meal.id}" 
                    data-meal-name="${meal.name}"
                    data-meal-servings="${meal.servings}" 
                    type="button"
                >
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-clipboard2-plus"
                    viewBox="0 0 16 16"
                    >
                    <path
                        d="M9.5 0a.5.5 0 0 1 .5.5.5.5 0 0 0 .5.5.5.5 0 0 1 .5.5V2a.5.5 0 0 1-.5.5h-5A.5.5 0 0 1 5 2v-.5a.5.5 0 0 1 .5-.5.5.5 0 0 0 .5-.5.5.5 0 0 1 .5-.5h3Z"
                    />
                    <path
                        d="M3 2.5a.5.5 0 0 1 .5-.5H4a.5.5 0 0 0 0-1h-.5A1.5 1.5 0 0 0 2 2.5v12A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 12.5 1H12a.5.5 0 0 0 0 1h.5a.5.5 0 0 1 .5.5v12a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5v-12Z"
                    />
                    <path
                        d="M8.5 6.5a.5.5 0 0 0-1 0V8H6a.5.5 0 0 0 0 1h1.5v1.5a.5.5 0 0 0 1 0V9H10a.5.5 0 0 0 0-1H8.5V6.5Z"
                    />
                    </svg>
                </button>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
    `;
  }
}

export default new MainView();

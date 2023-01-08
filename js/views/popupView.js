import View from "./View";

// view for generating meal modal popups
class PopupView extends View {
  _parentElement = document.querySelector(".modal-popups");

  // Joining generated HTML modals for every meal
  _generateMarkup() {
    return this._data.map(this._generateMarkupItemModal).join("");
  }

  // modal content
  _generateMarkupItemModal(meal) {
    return `
        <div
        class="portfolio-modal modal fade"
        id="portfolioModal${meal.id}"
        tabindex="-1"
        role="dialog"
        aria-hidden="true"
        >
        <div class="modal-dialog">
        <div class="modal-content">
            <div class="close-modal" data-dismiss="modal">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="35"
                fill="currentColor"
                class="bi bi-x-circle"
                viewBox="0 0 16 16"
            >
                <path
                d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                />
                <path
                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                />
            </svg>
            </div>
            <div class="container">
            <div class="row">
                <div class="col-lg-8 mx-auto">
                <div class="modal-body">
                    <!-- Project Details Go Here -->
                    <h2 class="">${meal.name}</h2>
                    <!-- <p class="item-intro text-muted">Lorem ipsum dolor sit amet consectetur.</p> -->
                    <img
                    class="img-fluid d-block mx-auto"
                    src="img/portfolio/hat.jpg"
                    alt=""
                    />
                    <p class="underline">SKŁADNIKI</p>
                    <ul class="list-inline">
                    ${meal.ingredients
                      .map(
                        (ing) =>
                          `<li>${ing.ingredient.name} - ${ing.amount} ${ing.ingredient.measure}</li>`
                      )
                      .join("")}
                    </ul>
                    <p class="underline">PRZYGOTOWANIE</p>
                    <p>
                    ${meal.recipe}
                    </p>
                    <p class="underline">MAKROELEMENTY /100g</p>
                    <ul class="list-inline">
                    <li>Białko: ${meal.proteins}g</li>
                    <li>Węglowodany: ${meal.carbohydrates}g</li>
                    <li>Tłuszcze: ${meal.fats}g</li>
                    </ul>
                    <div
                    class="btn-toolbar justify-content-between"
                    role="toolbar"
                    aria-label="Toolbar with button groups"
                    >
                    <div class="btn-group" role="group"></div>

                    <div id="addToListGroup2" class="input-group btn-group">
                        <div class="input-group-prepend">
                        <button
                            class="btn btn-primary"
                            type="button"
                            id="minus_popup"
                        >
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
                        id="quantity_popup"
                        type="text"
                        class=" "
                        value="1"
                        aria-label=""
                        min="1"
                        />

                        <div class="input-group-prepend">
                        <button
                            class="btn btn-primary"
                            type="button"
                            id="plus_popup"
                        >
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
                            class="btn btn-primary"
                            type="button"
                            id="addToList_popup"
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
            </div>
        </div>
        </div>
    </div>
    `;
  }
}

export default new PopupView();

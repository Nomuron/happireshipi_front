import * as bootstrap from "bootstrap";
import * as model from "./model.js";
import MainView from "./views/mainView.js";
import PopupView from "./views/popupView.js";
import ListIconView from "./views/listIconView.js";
import $, { type } from "jquery";

import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";

// Controller for loading data and render list
const controlAllMeals = async function () {
  try {
    // 1. Fetch API for all meals
    await model.loadAllMeals();

    // 2. Render main meals
    MainView.render(model.state.allMeals);

    // 3. Render hide modals
    PopupView.render(model.state.allMeals);

    // event listener for JQuery buttons
    MainView.addHandlerOnMealButtons();
    PopupView.addHandlerOnMealButtons();

    // renderuje odpowiednią liczbę na ikonie listy
    ListIconView.render(model.state.bookmarks);
  } catch (err) {
    console.error(err);
  }
};

// sterownik dodający posiłek do listy
const controlAddToList = function (mealToListObject) {
  // Dodaj posiłek do listy w model.state.bookmarks
  // Jeśli ten posiłek tam jest to jest zastępowany
  // Jeśli go tam nie ma to jest po prostu pushowany
  if (
    model.state.bookmarks.some(
      (bookmark) => bookmark.id === mealToListObject.id
    )
  ) {
    const bookmarkId = model.state.bookmarks.findIndex(
      (bookmark) => bookmark.id === mealToListObject.id
    );
    model.replaceMealInList(mealToListObject, bookmarkId);
  } else model.addMealToList(mealToListObject);

  // renderuje odpowiednią liczbę na ikonie listy
  ListIconView.render(model.state.bookmarks);
};

// control for category list
const controlCategorySelect = async function (category) {
  try {
    if (category === "all") {
      controlAllMeals();
    } else {
      // 1. Fetch API for all meals by category
      await model.findAllByCategory(category);

      // 2. Render main selected meals
      MainView.render(model.state.allMeals);

      // event listener for JQuery buttons in main view
      MainView.addHandlerOnMealButtons();
    }
  } catch (err) {
    console.error(`${err}`);
  }
};

// selectors and event listeners for placeholder
const controlMealButtons = function () {
  const plusBtn = document.querySelector("#plus");
  const minusBtn = document.querySelector("#minus");
  const addBtn = document.querySelector("#addToList");
  const plusPopBtn = document.querySelector("#plus_popup");
  const minusPopBtn = document.querySelector("#minus_popup");
  const addPopBtn = document.querySelector("#addToList_popup");

  plusBtn.addEventListener("click", addOne);
  minusBtn.addEventListener("click", minusOne);
  addBtn.addEventListener("click", add);
  plusPopBtn.addEventListener("click", addOne_popup);
  minusPopBtn.addEventListener("click", minusOne_popup);
  addPopBtn.addEventListener("click", add_popup);
};

// Funkcja inicjalizująca odpalana jako pierwsza.
// Ładuje wszystkie handlery na controlery
const init = function () {
  controlMealButtons();
  MainView.addHandlerOnWindowLoad(controlAllMeals);
  MainView.addHandlerAddToList(controlAddToList);
  PopupView.addHandlerAddToList(controlAddToList);
  MainView.addHandlerCategorySelect(controlCategorySelect);
};

function addOne() {
  if (Number(quantity.value) < 100) {
    quantity.value = Number(quantity.value) + 1;
  }
}
function addOne_popup() {
  if (Number(quantity_popup.value) < 100) {
    quantity_popup.value = Number(quantity_popup.value) + 1;
  }
}

function minusOne() {
  if (Number(quantity.value) > 1) {
    quantity.value = Number(quantity.value) - 1;
  }
}

function minusOne_popup() {
  if (Number(quantity_popup.value) > 1) {
    quantity_popup.value = Number(quantity_popup.value) - 1;
  }
}

function add() {
  console.log("dodano do listy dań " + quantity.value + " porcje");
}

function add_popup() {
  console.log("dodano do listy dań " + quantity_popup.value + " porcje");
}

init();

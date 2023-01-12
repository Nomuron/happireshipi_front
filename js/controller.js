import * as bootstrap from "bootstrap";
import * as model from "./model.js";
import MainView from "./views/mainView.js";
import PopupView from "./views/popupView.js";
import $ from "jquery";

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
  } catch (err) {
    console.error(err);
  }
};

const controlAddToList = function (mealId, mealServings) {
  console.log("Id: " + mealId);
  console.log("Porcje: " + mealServings);
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

const init = function () {
  controlMealButtons();
  MainView.addHandlerOnWindowLoad(controlAllMeals);
  MainView.addHandlerAddToList(controlAddToList);
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

import * as bootstrap from "bootstrap";
import * as model from "./model.js";
import MainView from "./views/mainView.js";
import PopupView from "./views/popupView.js";
import $ from "jquery";

import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";

const minus = document.getElementById("minus");
const plus = document.getElementById("plus");
const quantity = document.getElementById("quantity");
// console.log(quantity.value);
// console.log(typeof quantity.value);
const addToList = document.getElementById("addToList");

$("#plus").click(addOne);
$("#minus").click(minusOne);
$("#addToList").click(add);
$("#plus_popup").click(addOne_popup);
$("#minus_popup").click(minusOne_popup);
$("#addToList_popup").click(add_popup);

minus.addEventListener("click", minusOne);
plus.addEventListener("click", addOne);
addToList.addEventListener("click", add);

// Controller for loading data and render list
const controlAllMeals = async function () {
  try {
    // 1. Fetch API for all meals
    await model.loadAllMeals();

    // 2. Render main meals
    MainView.render(model.state.allMeals);

    // 3. Render hide modals
    PopupView.render(model.state.allMeals);
  } catch (err) {
    console.error(err);
  }
};

const init = function () {
  MainView.addHandlerOnWindowLoad(controlAllMeals);
};

// var quantity = document.getElementById("quantity");

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

// var minus_popup= document.getElementById("minus_popup");
// var plus_popup = document.getElementById("plus_popup");
// var quantity_popup = document.getElementById("quantity_popup");
// // console.log(quantity.value);
// // console.log(typeof quantity.value);
// var addToList_popup=document.getElementById("addToList_popup");

// minus_popup.addEventListener("click", minusOne );
// plus_popup.addEventListener("click", addOne );
// addToList_popup.addEventListener("click", add);

init();

import * as model from "./javascripts/model.js";
import view from "./javascripts/view.js";
import express from "../index.js";

const minus = document.getElementById("minus");
const plus = document.getElementById("plus");
const quantity = document.getElementById("quantity");
// console.log(quantity.value);
// console.log(typeof quantity.value);
const addToList = document.getElementById("addToList");

function addOne() {
  if (Number(quantity.value) < 100) {
    quantity.value = Number(quantity.value) + 1;
    // console.log(quantity.value);
  }
}

function minusOne() {
  if (Number(quantity.value) > 1) {
    quantity.value = Number(quantity.value) - 1;
    // console.log(quantity.value);
  }
}

function add() {
  console.log("dodano do listy dań " + quantity.value + " porcje");
}

minus.addEventListener("click", minusOne);
plus.addEventListener("click", addOne);
addToList.addEventListener("click", add);

// Controller for loading data and render list
const controlAllMeals = async function () {
  try {
    // 1. Fetch API for all meals
    await model.loadAllMeals();

    // 2. Render results
    view.render(model.state.allMeals);
  } catch (err) {
    console.error(err);
  }
};

const init = function () {
  view.addHandlerOnWindowLoad(controlAllMeals);
  express.meals();
};

init();

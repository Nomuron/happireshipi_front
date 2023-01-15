import * as bootstrap from "bootstrap";
import * as model from "./model.js";
import MainView from "./views/mainView.js";
import PopupView from "./views/popupView.js";
import ListIconView from "./views/listIconView.js";
import DishesListView from "./views/dishesListView.js";
import IngredientsListView from "./views/ingredientsListView.js";
import $, { type } from "jquery";

import "bootstrap/dist/js/bootstrap.bundle.min.js";

// funkcja odpalana po załadowaniu strony
const init = function () {
  IngredientsListView.addHandlerOnWindowLoad(controlIngredientsList);
};

// funkcja ładuje składniki wybranych posiłków
const controlIngredientsList = async function () {
  try {
    // wyczyszczenie model.state.ingredients
    model.cleanIngredientList();

    // przeliczanie zakupów
    await model.countShopping();
  } catch (err) {
    console.log(`${err}`);
  }
};

init();

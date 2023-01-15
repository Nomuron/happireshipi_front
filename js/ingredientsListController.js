import * as bootstrap from "bootstrap";
import * as model from "./model.js";
import IngredientsListView from "./views/ingredientsListView.js";
import $, { type } from "jquery";

import "bootstrap/dist/js/bootstrap.bundle.min.js";

// funkcja odpalana po załadowaniu strony
const init = function () {
  // Po załadowaniu strony od razu przelicza zakupy
  IngredientsListView.addHandlerOnWindowLoad(controlIngredientsList);
};

// funkcja ładuje składniki wybranych posiłków
const controlIngredientsList = async function () {
  try {
    // wyczyszczenie model.state.ingredients
    model.cleanIngredientList();

    // przeliczanie zakupów
    await model.countShopping();

    // renderowanie listy zakupów
    IngredientsListView.render(model.state.ingredients);
  } catch (err) {
    console.error(`${err}`);
  }
};

init();

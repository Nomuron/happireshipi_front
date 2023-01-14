import * as bootstrap from "bootstrap";
import * as model from "./model.js";
import MainView from "./views/mainView.js";
import PopupView from "./views/popupView.js";
import ListIconView from "./views/listIconView.js";
import DishesListView from "./views/dishesListView.js";
import $, { type } from "jquery";

import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";

// funkcja odpalana po załadowaniu strony
const init = function () {
  DishesListView.addHandlerOnWindowLoad(controlDishesList);
};

// ładuje zapisane posiłki
const controlDishesList = function () {
  // renderuje listę posiłków
  DishesListView.render(model.state.bookmarks);

  // renderuje odpowiednią liczbę na ikonie listy
  ListIconView.render(model.state.bookmarks);
};

// czyści listę zapisanych posiłków

init();

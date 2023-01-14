import View from "./View";

// widok do generowania liczby przy ikonie listy
class ListIconView extends View {
  _parentElement = document.querySelector("#circle");

  render(data) {
    this._data = data;
    const mealsNumber = data.length;
    console.log(mealsNumber);
    this._parentElement.innerHTML = mealsNumber;
  }
}

export default new ListIconView();

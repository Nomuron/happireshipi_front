import * as bootstrap from "bootstrap";
import * as model from "./model.js";

const minus = document.getElementById("minus");
const plus = document.getElementById("plus");
const quantity = document.getElementById("quantity");
// console.log(quantity.value);
// console.log(typeof quantity.value);
const addToList = document.getElementById("addToList");

const API_URL = "http://localhost:8080/meal/";

const getJSON = async function (url) {
  try {
    const res = await fetch(url, { method: "GET", mode: "cors" });
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})}`);
    return data;
  } catch (err) {
    throw error;
  }
};

export const loadMeal = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);

    console.log(data);
  } catch (err) {
    console.error(`${err}`);
    throw err;
  }
};

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

loadMeal(3);

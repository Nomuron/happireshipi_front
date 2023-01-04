const fetch = require("node-fetch");
const MealClass = require("../models/mealClass");

const API_URL = "http://localhost:8080/meal/";
const ALL_MEALS_URL = "http://localhost:8080/meal/all";
// const API_URL = "http://spring:8080/meal/";
// const ALL_MEALS_URL = "http://spring:8080/meal/all";

// State of data, object for fetching data from API
let state = {
  meal: {},
  allMeals: [],
  bookmarks: [],
};

// const meals = [];

// module.exports = class Meal {
//   constructor(meal) {
//     this.meal = meal;
//   }

//   save() {
//     meals.push(this);
//   }

//   static fetchAll() {
//     return meals;
//   }
// };

// fetching JSON from Spring API
const springJSON = async function (url) {
  try {
    // dla dockera, taka wersja musi być w kodzie faktycznym
    // const response = await fetch("http://spring:8080/meal/all");
    // dla locala
    const res = await fetch(url);
    // const myjson = JSON.parse(await response.text());
    // const data = await res.json();
    const data = JSON.parse(await res.text());

    // cały JSON
    // console.log(myjson);
    // jeden element z JSONa
    // console.log(myjson[0])
    // składniki konkretnego dania
    // console.log(myjson[0]["mealIngredients"]);
    // myjson.forEach((meal) => {
    //   const objMeal = new Meal(meal);
    //   objMeal.save();
    // });
    return data;
  } catch (error) {
    throw error;
  }
};

// Fetch one meal and load it to state object
exports.loadMeal = async function (id) {
  const data = await springJSON(`${API_URL}${id}}`);

  const { meal } = data;
  state.meal = {
    id: meal.id,
    name: meal.name,
    perPortionCalories: meal.perPortionCalories,
    category: meal.category,
    imageDirectory: meal.imageDirectory,
  };
};

exports.loadAllMeals = async function () {
  try {
    const data = await springJSON(ALL_MEALS_URL);
    // console.log(data[0]);

    // allMeals = data.map((meal) => {
    //   return {
    //     id: meal.id,
    //     name: meal.name,
    //     perPortionCalories: meal.perPortionCalories,
    //     category: meal.category,
    //     imageDirectory: meal.imageDirectory,
    //   };
    // let meal;
    // for (let i = 0; i < data.length; i++) {
    //   meal = data[i];
    //   let obj = new MealClass(meal);
    //   obj.save();
    // }
    data.forEach((meal) => {
      let obj = new MealClass(meal);
      obj.save();
    });

    // });
    // console.log("In models: state");
    // console.log(allMeals[1]);
    // console.log(typeof allMeals[1]);
    // return allMeals;
  } catch (error) {
    console.error(`${error}`);
    throw error;
  }
};

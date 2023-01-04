// packages from npm
const path = require("path");
const express = require("express");
const fetch = require("node-fetch");
const bodyParser = require("body-parser");

// Variables
const app = express();
// port for dev
const port = 8085;
// port for prod
// const port = 8081;

// object for storing Spring JSON
const backJson = {
  meal: {},
  allMeals: [],
};

// Set engine for generating views from ./views folder
app.set("view engine", "ejs");
app.set("views", "views");

// Middlewares
const mainRoutes = require("./routes/main");

// Using packages in express
// This one is for parsing body, fetching data from body, etc.
app.use(bodyParser.urlencoded({ extended: false }));
// Set folder ./public for static content (like css and scripts used in a browser)
app.use(express.static("public"));

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// console.log(__dirname);

// used routes in express (endpoints)
app.use(mainRoutes);

// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/index.html");
// });

// const delay = (ms) => new Promise((res) => setTimeout(res, ms));

// fetching JSON from Spring API
meals = async () => {
  // dla dockera, taka wersja musi być w kodzie faktycznym
  // const response = await fetch("http://spring:8080/meal/all");
  // dla locala
  const response = await fetch("http://localhost:8080/meal/all");
  const myjson = JSON.parse(await response.text());
  // cały JSON
  // console.log(myjson);
  // jeden element z JSONa
  // console.log(myjson[0]);
  // składniki konkretnego dania
  // console.log(myjson[0]["mealIngredients"]);
  backJson.allMeals = myjson.map((meal) => {
    return {
      id: meal.id,
      name: meal.name,
      perPortionCalories: meal.perPortionCalories,
      category: meal.category,
      imageDirectory: meal.imageDirectory,
    };
  });
};

// express listens for request on a specific port
app.listen(port);

// fetching JSON from Spring API
// meals();
// console.log("in index.js");
// console.log(backJson);
// module.exports = backJson;

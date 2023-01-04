const Meal = require("../models/meal");

exports.getMeals = (req, res, next) => {
  const meals = Meal.fetchAll();
  res.render("index", {
    meals: meals,
    pageTitle: "Main",
  });
};

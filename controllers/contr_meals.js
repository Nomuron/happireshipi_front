const model = require("../models/model");
const MealClass = require("../models/mealClass");

// NIE JEST SKOŃCZONE
exports.getMeals = (req, res, next) => {
  model.loadAllMeals();

  const meals = MealClass.fetchAll();

  console.log("=========controller=======");
  console.log(meals);

  res.render("index", {
    meals: meals[0],
    name: meals[0].meal.name,
  });
};

// exports.getMeals = (req, res, next) => {
//   const meals = model.fetchAll();
//   res.render("index", {
//     meals: meals,
//     pageTitle: "Main",
//   });
// };

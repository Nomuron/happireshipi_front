const meals = [];

module.exports = class Meal {
  constructor(meal) {
    this.meal = meal;
  }

  save() {
    meals.push(this);
  }

  static fetchAll() {
    return meals;
  }
};

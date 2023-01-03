const API_URL = "http://localhost:8080/meal/";
const ALL_MEALS_URL = "http://localhost:8080/meal/all";
// dla dockera
// const ALL_MEALS_URL = "http://spring:8080/meal/all";

// State of data, object for fetching data from API
export const state = {
  meal: {},
  allMeals: [],
  bookmarks: [],
};

// Function for fetching JSON from url
const getJSON = async function (url) {
  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})}`);
    return data;
  } catch (err) {
    throw error;
  }
};

// Fetch one meal and load it to state object
export const loadMeal = async function (id) {
  try {
    // get data
    const data = await getJSON(`${API_URL}${id}`);

    const { meal } = data;
    state.meal = {
      id: meal.id,
      name: meal.name,
      perPortionCalories: meal.perPortionCalories,
      category: meal.category,
      imageDirectory: meal.imageDirectory,
    };

    console.log(data);
  } catch (err) {
    console.error(`${err}`);
    throw err;
  }
};

// Fetch all meals from API and load it into state object
export const loadAllMeals = async function () {
  try {
    const data = await getJSON(ALL_MEALS_URL);

    state.allMeals = data.map((meal) => {
      return {
        id: meal.id,
        name: meal.name,
        perPortionCalories: meal.perPortionCalories,
        category: meal.category,
        imageDirectory: meal.imageDirectory,
      };
    });
  } catch (err) {
    console.error(`${err}`);
    throw err;
  }
};

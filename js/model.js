const API_URL = "http://localhost:8080/meal/";
const ALL_MEALS_URL = "http://localhost:8080/meal/all";

// http://localhost:8080/meal/sort/{category}
const MEALS_BY_CATEGORY = "http://localhost:8080/meal/sort/";

// dla dockera
// const ALL_MEALS_URL = "http://spring:8080/meal/all";

// State of data, object for fetching data from API
export const state = {
  // na pojedynczy posiłek, nieużywane
  meal: {},
  // tutaj będą wszystkie posiłki z pobranego JSONa
  allMeals: [],
  // tutaj będą posiłki dodane do listy
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
    throw err;
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
      recipe: meal.recipe,
      proteins: meal.proteins,
      carbohydrates: meal.carbohydrates,
      fats: meal.fats,
      ingredients: meal.mealIngredients[0],
    };
  } catch (err) {
    console.error(`${err}`);
    throw err;
  }
};

// function for pushing data into state.allMeals
const pushMealsToState = function (data) {
  state.allMeals = data.map((meal) => {
    return {
      id: meal.id,
      name: meal.name,
      perPortionCalories: meal.perPortionCalories,
      category: meal.category,
      imageDirectory: meal.imageDirectory,
      recipe: meal.recipe,
      proteins: meal.proteins,
      carbohydrates: meal.carbohydrates,
      fats: meal.fats,
      ingredients: meal.mealIngredients,
      servings: "1",
    };
  });
};

// Fetch all meals from API and load it into state object
export const loadAllMeals = async function () {
  try {
    // pobieranie wszystkich posiłków
    const data = await getJSON(ALL_MEALS_URL);

    // umieszczenie ich w state.allMeals
    pushMealsToState(data);
  } catch (err) {
    console.error(`${err}`);
    throw err;
  }
};

// funkcja do pobierania posiłków o danej kategorii ze Springa
export const findAllByCategory = async function (category) {
  try {
    // pobieranie po kategorii
    const data = await getJSON(`${MEALS_BY_CATEGORY}${category}`);

    // umieszczenie tych posiłków w state.allMeals
    pushMealsToState(data);
  } catch (err) {
    console.error(`${err}`);
    throw err;
  }
};

// funkcja używana podczas dodawania posiłku do listy, gdy tego posiłku nie ma na liście
export const addMealToList = function (mealToListObject) {
  // dodaje posiłek do listy
  state.bookmarks.push(mealToListObject);

  // test
  console.log(state.bookmarks);

  // zapis do local storage
  persistBookmarks();
};

// funkcja używana podczas dodawania posiłku do listy, gdy ten posiłek jest na liście
export const replaceMealInList = function (mealToListObject, mealIdInList) {
  // jeśli dany posiłek jest na liście to jest zastępowany
  state.bookmarks.splice(mealIdInList, 1, mealToListObject);

  // test
  console.log(state.bookmarks);

  // zapis do local storage
  persistBookmarks();
};

// zapis do local storage
// Local storage jest używany przez klienta.
// Ciastka natomiast są wysyłane na serwer.
// Z racji tego, że nie wysyłamy niczego na Springa to ograniczyłem się do local storage.
const persistBookmarks = function () {
  // do local storage są zapisywane jedynie wybrane posiłki
  localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
};

// funkcja inicjalizująca do wczytywania local storage
const init = function () {
  // wczytywanie local storage
  const storage = localStorage.getItem("bookmarks");

  // jeśli local storage jest to wczytaj go do tablicy wybranych posiłków
  if (storage) state.bookmarks = JSON.parse(storage);
};

init();

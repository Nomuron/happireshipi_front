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
  // tutaj będą zakupy
  ingredients: [],
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

    const meal = data;
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
      ingredients: meal.mealIngredients,
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

// liczenie zakupów
export const countShopping = async function () {
  Promise.all(
    state.bookmarks.map(async (bookmark) => {
      // zapisuje ilość porcji
      const servings = bookmark.servings;

      // pobiera dane do state.meal
      await loadMeal(bookmark.id);

      // iteruje po state.meal.ingredients i uruchamia funkcję
      // która przelicza ilość składników
      state.meal.ingredients.map((ingredient) => {
        countIngredient(ingredient, servings);
      });
    })
  ).catch((err) => {
    console.error(`${err}`);
    throw err;
  });
};

// funkcja przelicza składniki w zależności od ilości porcji
// i tego, czy dany składnik znajduje się na liście
const countIngredient = function (ingredient, servings) {
  // przemapowanie JSONów
  const ingred = {
    name: ingredient.ingredient.name,
    measure: ingredient.ingredient.measure,
    amount: ingredient.amount,
  };

  // przelicza ilość składników w zależności od porcji
  ingred.amount *= servings;

  // szuka składnika na liście
  if (state.ingredients.some((ing) => ing.name === ingred.name)) {
    // jest, więc szuka indeks składnika z tablicy
    const ingId = state.ingredients.findIndex(
      (ing) => ing.name === ingred.name
    );
    // zapamiętuje ilość z tablicy
    const oldAmount = state.ingredients[ingId].amount;

    // sumuje starą i nową ilość
    ingred.amount += oldAmount;

    // zastępuje
    state.ingredients.splice(ingId, 1, ingred);
  }
  // jeśli składnika nie ma w tablicy to jest tam umieszczany
  else state.ingredients.push(ingred);
};

// funkcja sprawdza czy posiłek dodawany do listy już jest na liście
// i podejmuje odpowiednie kroki
export const addMeal = function (mealToListObject) {
  // Dodaj posiłek do listy w state.bookmarks
  // Jeśli ten posiłek tam jest to jest zastępowany
  // Jeśli go tam nie ma to jest po prostu pushowany
  if (state.bookmarks.some((bookmark) => bookmark.id === mealToListObject.id)) {
    const bookmarkId = state.bookmarks.findIndex(
      (bookmark) => bookmark.id === mealToListObject.id
    );
    replaceMealInList(mealToListObject, bookmarkId);
  } else addMealToList(mealToListObject);
};

// funkcja używana podczas dodawania posiłku do listy, gdy tego posiłku nie ma na liście
export const addMealToList = function (mealToListObject) {
  // dodaje posiłek do listy
  state.bookmarks.push(mealToListObject);

  // zapis do local storage
  persistBookmarks();
};

// funkcja używana podczas dodawania posiłku do listy, gdy ten posiłek jest na liście
export const replaceMealInList = function (mealToListObject, mealIdInList) {
  // jeśli dany posiłek jest na liście to jest zastępowany
  state.bookmarks.splice(mealIdInList, 1, mealToListObject);

  // zapis do local storage
  persistBookmarks();
};

export const cleanList = function () {
  // wyczyść state.bookmarks
  state.bookmarks = [];

  // zapis do local storage
  persistBookmarks();
};

// do czyszczenia przeliczonych skłądników
// odpalany za każdym załadowaniem listy zakupów
export const cleanIngredientList = function () {
  state.ingredients = [];
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

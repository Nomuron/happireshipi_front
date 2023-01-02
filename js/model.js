const API_URL = "http://localhost:8080/meal/";

// State of data
export const state = {
  meal: {},
  mealList: [],
};

// Fetch JSON from url
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

export const loadMeal = async function (id) {
  try {
    // get data
    const data = await getJSON(`${API_URL}${id}`);

    const { meal } = data;

    console.log(data);
  } catch (err) {
    console.error(`${err}`);
    throw err;
  }
};

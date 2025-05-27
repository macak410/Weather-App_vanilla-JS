import { AJAX } from "./helpers.js";

import { API_URL, API_KEY, DATE } from "./config.js";

export let state = {
  dates: {
    timeDay: "",
    curDate: "",
  },
  search: {
    city: "",
    country: "",
    query: "",
    results: [],
  },
};

export const loadSearch = async function (query) {
  try {
    state.search.query = query;
    const queryType = `q=${query}`;

    const data = await AJAX(API_URL, queryType, API_KEY);
    state.dates.timeDay = data.list.at(0).sys.pod;
    state.dates.curDate = new Date(data.list.at(0).dt_txt);

    state.search.city = data.city.name;
    state.search.country = data.city.country;
    state.search.results = data.list.map((list) => {
      return {
        temp: Math.ceil(list.main.temp),
        feelsLike: Math.ceil(list.main.feels_like),
        tempMin: Math.ceil(list.main.temp_min),
        tempMax: Math.ceil(list.main.temp_max),
        humidity: list.main.humidity,
        weatherType: list.weather.at(0).main,
        weatherTypeExt: list.weather.at(0).description,
        wind: list.wind.speed,
        date: new Date(list.dt_txt),
      };
    });
    console.log(state);
  } catch (error) {
    console.log(`${error} ! ! !`);
    throw error;
  }
};

export const loadWithLocation = async function (position) {
  try {
    const { latitude, longitude } = position.coords;
    const queryType = `lat=${latitude}&lon=${longitude}`;

    const data = await AJAX(API_URL, queryType, API_KEY);

    state.dates.timeDay = data.list.at(0).sys.pod;
    state.dates.curDate = new Date(data.list.at(0).dt_txt);

    state.search.city = data.city.name;
    state.search.country = data.city.country;
    state.search.results = data.list.map((list) => {
      return {
        temp: Math.ceil(list.main.temp),
        feelsLike: Math.ceil(list.main.feels_like),
        tempMin: Math.ceil(list.main.temp_min),
        tempMax: Math.ceil(list.main.temp_max),
        humidity: list.main.humidity,
        weatherType: list.weather.at(0).main,
        weatherTypeExt: list.weather.at(0).description,
        wind: list.wind.speed,
        date: new Date(list.dt_txt),
      };
    });
    console.log(state);
  } catch (error) {
    console.log(`${error} ! ! !`);
    throw error;
  }
};

export const loadDate = function () {
  const hours = DATE.getHours();

  state.dates.curDate = DATE;
  state.dates.timeDay = `${hours > 6 && hours < 20 ? "d" : "n"}`;
};

export const loadFiveDayForecast = function () {
  return state.search.results.filter((result) => result.date.getHours() === 12);
};

import iconLocation from "url:../imgs/location.png";
import iconVerticalBig from "url:../imgs/line-big.png";
import iconHumidity from "url:../imgs/humidity.png";
import iconWind from "url:../imgs/wind.png";
import iconVerticalSmall from "url:../imgs/line-smallest.png";

const API_URL = "https://api.openweathermap.org/data/2.5";
const API_KEY = "b7b773aed612caecc4e31b76c0364fdb";
const CURRENT_FORECAST = "weather";
const FIVEDAY_FORECAST = "forecast";

const dateEl = document.querySelector(".date");

// Functions
// const calculateSunsetAndSunrise = function (typeEl, type) {
//   const sunriseEl = document.querySelector(`.sns-time__${typeEl}`);
//   const date = new Date(type * 1000);

//   sunriseEl.textContent = new Intl.DateTimeFormat("default", {
//     hour: "numeric",
//     minute: "numeric",
//   }).format(date);
// };

// const sunriseAndSunset = function (data) {
//   calculateSunsetAndSunrise("sr", data.sys.sunrise);

//   calculateSunsetAndSunrise("ss", data.sys.sunset);
// };

// AJAX
const AJAX = async function (apiUrl, forecastType, cityName, apiKey) {
  try {
    const response = await fetch(
      `${apiUrl}/${forecastType}?q=${cityName}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();
    if (!response.ok) throw new Error(`Error fetching data!`);

    return data;
  } catch (err) {
    console.log(err);
  }
};

const renderDate = function () {
  const curDate = new Date();
  const day = curDate.getDate();
  const year = curDate.getFullYear();
  const weekday = curDate.toLocaleString("default", { weekday: "long" });
  const month = curDate.toLocaleString("default", { month: "long" });

  const markup = `
    <span class="date__day">${weekday}</span>
    <span class="date__split">|</span>
    <span class="date__day-month">${day < 9 ? "0" + day : day} ${month}</span>
    <span class="date__split">|</span>
    <span class="date__year">${year}</span>
  `;

  dateEl.insertAdjacentHTML("afterbegin", markup);
};

const renderWeather = function (data) {
  const weatherIcon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  const markup = `
    <div class="upper">
      <div class="location-icon">
        <img src="${iconLocation}" alt="location-icon" />
      </div>
      <p>
        <span class="city-name">${data.name}</span>
      </p>
    </div>

    <div class="middle">
      <div class="middle__weather-image">
        <img src="${weatherIcon}" alt="cloudy" />
      </div>
      <div class="middle__splitter">
        <img src="${iconVerticalBig}" alt="vertical-line" />
      </div>
      <h1 class="heading-h1">${Math.round(data.main.temp)}°</h1>
    </div>

    <div class="bottom">
      <div class="bottom-left">
        <h2 class="heading-h2">${data.weather[0].main}</h2>
        <p class="weather-description">${data.weather[0].description}</p>
      </div>
      <div class="bottom-right">
        <div class="weather-info mb-sm">
          <div class="weather-info__img">
            <img src="${iconWind}" alt="wind-icon" />
          </div>
          <div class="weather-info__spliter">
            <img src="${iconVerticalSmall}" alt="vertical-line" />
          </div>
          <p class="weather-wind">${Math.round(data.wind.speed)}km/h</p>
        </div>
        <div class="weather-info">
          <div class="weather-info__img">
            <img src="${iconHumidity}" alt="wind-icon" />
          </div>
          <div class="weather-info__spliter">
            <img src="${iconVerticalSmall}" alt="vertical-line" />
          </div>
          <p class="weather-humidity">${data.main.humidity}%</p>
        </div>
      </div>
    </div>
  `;

  document.querySelector(".right-side").innerHTML = "";

  document
    .querySelector(".right-side")
    .insertAdjacentHTML("afterbegin", markup);
};

const renderWeatherLocation = async function (position) {
  try {
    const { latitude } = position.coords;
    const { longitude } = position.coords;

    const response = await fetch(
      `${API_URL}/${currentForecast}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
    );
    if (!response.ok) throw new Error("Error while fetching data!");
    const data = await response.json();
    if (!data) return;

    renderWeather(data);
  } catch (error) {
    console.error(error);
  }
};
navigator.geolocation.getCurrentPosition(renderWeatherLocation);

const loadSearch = async function (city) {
  try {
    const data = await AJAX(API_URL, currentForecast, city, API_KEY);
    if (!data) {
      const markup = `<p class="invalid-city">Invalid city name!</p>`;
      document.querySelector(".search").insertAdjacentHTML("afterend", markup);
      setTimeout(() => {
        document.querySelector(".invalid-city").remove();
      }, 2000);
    }
    return data;
  } catch (err) {
    console.log(err);
  }
};

const handlerSearch = async function () {
  try {
    const cityName = document.querySelector(".search__field").value;

    const data = await loadSearch(cityName);
    if (!data) return;

    // sunriseAndSunset(data);

    renderWeather(data);
  } catch (err) {
    console.log(err);
  }
};

const addHandlerSearch = function (handlerSearch) {
  document.querySelector(".search").addEventListener("submit", (e) => {
    e.preventDefault();
    handlerSearch();
  });
};

const init = function () {
  renderDate();
  addHandlerSearch(handlerSearch);
};

init();

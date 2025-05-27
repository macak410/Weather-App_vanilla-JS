import View from "./View.js";

class fiveDayForecastView extends View {
  _parentElement = document.querySelector(".forecast-days-weather");

  _generateMarkup() {
    return `
        <figure class="single-day-weather">
            <p class="single-day-weather--info">${this._data.date.toLocaleString(
              "default",
              { weekday: "long" }
            )}</p>
            <h2 class="heading-h2">${this._data.temp} °C</h2>
            <p class="single-day-weather--info">${this._data.weatherType}</p>
        </figure>
        `;
  }
}

export default new fiveDayForecastView();

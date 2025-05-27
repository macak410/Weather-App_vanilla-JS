import View from "./View.js";
import infoView from "./infoView.js";
import icons from "../../imgs/icons.svg";

class mainScreenView extends View {
  _parentElement = document.querySelector(".main-weather-description");

  _generateMarkup() {
    return `
        <div class="temps-today">Temperature Now in ${this._data.city}, ${this._data.country}</div>
        <div class="temps-humidity-wind">
        <div class="temperatures-big">
          <h1 class="heading-h1">${this._data.temp}°</h1>
          <p class="feels-like-temp">
            feels like <span class="feels-like-value">${this._data.feelsLike}°</span>
          </p>
        </div>

        <div class="humidity-and-wind">
          <p class="humidity-and-wind--wrapper humidity">
            <svg>
              <use href="${icons}#icon-humidity" />
            </svg>
            <span class="humidity-percent">${this._data.humidity} %</span>
          </p>
          <p class="humidity-and-wind--wrapper wind">
            <svg>
              <use href="${icons}#icon-wind" />
            </svg>
            <span class="wind-speed">${this._data.wind} km/h</span>
          </p>
        </div>
      </div>

      <div class="weather-desc-and-minmax">
        <div class="weather-desc">
          <p class="weather-desc-type">${this._data.weatherType}</p>
          <p class="weather-desc-type-extended">${this._data.weatherTypeExt}</p>
        </div>

        <div class="min-max">
          <div class="minmax-temp">
            Min: <span class="min-temp">${this._data.tempMin}°</span>
          </div>
          <span class="divider">&VerticalLine;</span>
          <div class="minmax-temp">
            Max <span class="max-temp">${this._data.tempMax}°</span>
          </div>
        </div>
      </div>
        `;
  }
}

export default new mainScreenView();

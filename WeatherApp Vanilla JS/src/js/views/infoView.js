import View from "./View.js";
import icons from "../../imgs/icons.svg";

class infoView extends View {
  _parentElement = document.querySelector(".weather-about");
  _errorMessage = "Unable to find informations for chosen place";
  _message = "";

  _generateMarkup() {
    return `
        <p class="location">
            <svg width="30" height="30">
                <use href="${icons}#icon-location" />
            </svg>
          <span class="location-city-country">${this._data.city}, ${this._data.country}</span>
        </p>
        `;
  }
}

export default new infoView();

import View from "./View.js";
import fiveDayForecastView from "./fiveDayForecastView.js";

class fiveDayResultsView extends View {
  _parentElement = document.querySelector(".forecast-days-weather");
  _errorMessage = "";
  _message = "";

  _generateMarkup() {
    return this._data
      .map((result) => fiveDayForecastView.render(result, false))
      .join("");
  }
}

export default new fiveDayResultsView();

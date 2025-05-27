import * as model from "./model.js";
import searchView from "./views/searchView.js";
import infoView from "./views/infoView.js";
import mainScreenView from "./views/mainScreenView.js";
import dateView from "./views/dateView.js";
import fiveDayResultsView from "./views/fiveDayResultsView.js";

const controlSearchResults = async function () {
  try {
    mainScreenView.renderSpinner();
    const query = searchView.getQuery();
    if (!query) return;

    await model.loadSearch(query);

    infoView.render(model.state.search);

    mainScreenView.render({
      ...model.state.search.results.at(0),
      city: model.state.search.city,
      country: model.state.search.country
    });

    fiveDayResultsView.render(model.loadFiveDayForecast());
    dateView.render(model.state.dates);
  } catch (error) {
    mainScreenView.renderError(`⛔ Wrong city name!`);
    fiveDayResultsView.renderError("");
    infoView.renderError("Location unknown 🤷‍♂️");
    console.error(error);
  }
};


const controlDate = function () {
  dateView.renderSpinner();

  model.loadDate();

  dateView.render(model.state.dates);
};

const controlLoadWithLocation = async function () {
  try {
    mainScreenView.renderSpinner();
    dateView.renderSpinner();

    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    await model.loadWithLocation(position);

    mainScreenView.render({
      ...model.state.search.results.at(0),
      city: model.state.search.city,
      country: model.state.search.country
    });

    infoView.render(model.state.search);
    fiveDayResultsView.render(model.loadFiveDayForecast());
    dateView.render(model.state.dates);
  } catch (error) {
    mainScreenView.renderError("⛔ You denied location permission. Search any location instead.");
    console.error(error);
  }
};


const init = function () {
  controlLoadWithLocation();
  dateView.addHandlerRender(controlDate);
  searchView.addHandlerSearch(controlSearchResults);
};
init();

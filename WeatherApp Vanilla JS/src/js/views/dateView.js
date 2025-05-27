import View from "./View.js";

class dateView extends View {
  _parentElement = document.querySelector(".current-date");

  addHandlerRender(handler) {
    window.addEventListener("load", (e) => {
      handler();
    });
  }

  _generateMarkup() {
    return `
            <h2 class="heading-h2 mb-2">${
              this._data.timeDay === "d"
                ? "☀️ Good Afternoon"
                : "🌜 Good Evening"
            }</h2>
            <p class="date-today">${this._data.curDate.toLocaleString(
              "default",
              { weekday: "long" }
            )}, ${this._data.curDate.getDate()} ${this._data.curDate.toLocaleString(
      "default",
      { month: "long" }
    )}, ${this._data.curDate.getFullYear()}</p>
        `;
  }
}

export default new dateView();

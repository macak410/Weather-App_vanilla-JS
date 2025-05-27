export default class View {
  _data;

  render(data, render = true) {
    if (!data) return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();
    if (!render) return markup;

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }

  renderSpinner() {
    const markup = `
        <p class="spinner">Loading...</p>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderMessage(message = this._message) {
    const markup = `
            <p class="message">😄 ${message}</p>
        `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
            <p class="error-message">${message}</p>
        `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}

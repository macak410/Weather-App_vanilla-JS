class SearchView {
  _parentEl = document.querySelector(".search-form");

  getQuery() {
    const query = this._parentEl.querySelector(".search").value;
    this._clear();
    return query;
  }

  _clear() {
    this._parentEl.querySelector(".search").value = "";
  }

  addHandlerSearch(handler) {
    this._parentEl.addEventListener("submit", (e) => {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();

class SearchViews {
  _parentElement = document.querySelector('.search');
  getQuery() {
    return this._parentElement.querySelector('.search__field').value;
  }

  clearInput() {
    return this._parentElement.querySelector('.search__field').value=''; 
  }

  addHandelSearch(handelSearch) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
     
      handelSearch();
    });
  }
}

export default new SearchViews();

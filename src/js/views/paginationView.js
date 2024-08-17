import icons from 'url:./../../img/icons.svg';
import { View } from './View';
class PaginationSView extends View {
  _parentElement = document.querySelector('.pagination');

  _generateMarkup() {
    const numPage = Math.ceil(
      this._data.results.length / this._data.resultPerPage
    );

    // console.log(this._data);
    const currentPage = this._data.page;
    //first page
    if (currentPage === 1 && numPage > 1) {
      return ` <button data-goto="${
        currentPage + 1
      }" class="btn--inline pagination__btn--next">
        <span>Page ${currentPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
    </button>`;
    }
    //last page
    if (currentPage === numPage && numPage > 1) {
      return `
    <button data-goto="${
      currentPage - 1
    }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${currentPage - 1}</span>
    </button>`;
    }
    //other
    if (currentPage < numPage) {
      return `
      <button data-goto="${
        currentPage - 1
      }" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${currentPage - 1}</span>
      </button>
     <button data-goto="${
       currentPage + 1
     }" class="btn--inline pagination__btn--next">
        <span>Page ${currentPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
    </button>
`;
    }

    return '';
  }

  addPaginationHandler(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const nextBtn = +btn.dataset.goto;
      handler(nextBtn);
    });
  }
}

export default new PaginationSView();

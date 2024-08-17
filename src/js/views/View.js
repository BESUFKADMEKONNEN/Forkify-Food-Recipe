import icons from 'url:./../../img/icons.svg';
export class View {
  _data;
  _message = '';

  render(data,render=true) {
    // console.log( data);
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markeup = this._generateMarkup();
if(!render) return markeup;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markeup);
  }

  update(data) {
    this._data = data;

    const newMarkeUp = this._generateMarkup();
    const newDOM = document.createRange().createContextualFragment(newMarkeUp);
    const newElement = Array.from(newDOM.querySelectorAll('*'));
    const currElement = Array.from(this._parentElement.querySelectorAll('*'));

    newElement.forEach((newEle, i) => {
      const curEle = currElement[i];
      if (
        !newEle.isEqualNode(curEle) &&
        newEle.firstChild?.nodeValue.trim() !== ''
      ) {
        curEle.textContent = newEle.textContent;
      }
      if (!newEle.isEqualNode(curEle)) {
        Array.from(newEle.attributes).forEach(attr => {
          curEle.setAttribute(attr.name, attr.value);
        });
      }
    });
  }

  renderSpinner() {
    const markup = `
          <div class="spinner">
            <svg>
              <use href="${icons}#icon-loader"></use>
            </svg>
          </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderError(message = this._errorMessage) {
    const markup = `
         <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div> 
`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
           <div class="message">
          <div>
            <svg>
              <use href="${icons}#icon-smile"></use>
            </svg>
          </div>
          <p>${message}</p>
        </div>
`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}

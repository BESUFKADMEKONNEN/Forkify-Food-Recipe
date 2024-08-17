import icons from 'url:./../../img/icons.svg';
import previewView from './previewView';
import { View } from './View';
class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _orginalParentElement = document.querySelector('.upload').innerHTML;
  _windowElement = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _openBtn = document.querySelector('.nav__btn--add-recipe');
  _closeBtn = document.querySelector('.btn--close-modal');
  _message = 'Recipe was sucessfully uploded :)';

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._removeHandlerShowWindow();
  }

  toogleWindow() {
    this._windowElement.classList.toggle('hidden');
    this._overlay.classList.toggle('hidden');
    this._parentElement.innerHTML = this._orginalParentElement;
  }

  _addHandlerShowWindow() {
    this._openBtn.addEventListener('click', this.toogleWindow.bind(this));
  }

  _removeHandlerShowWindow() {
    this._closeBtn.addEventListener('click', this.toogleWindow.bind(this));
    this._overlay.addEventListener('click', this.toogleWindow.bind(this));
  }

  addHandlerUplode(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const dataObj = Object.fromEntries(dataArr);
      handler(dataObj);
    });
  }
  _generateMarkup() {}
}

export default new AddRecipeView();

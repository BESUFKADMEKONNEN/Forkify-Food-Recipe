import previewView from './previewView';
import icons from 'url:./../../img/icons.svg';
import { View } from './View';
class ResultSView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipe found for your query! Please try again :) ';

  _generateMarkup() {
    
    return this._data.map(res=>previewView.render(res,false)).join('');
  }
 
}
export default new ResultSView();

import * as model from './model.js';
import recipeView from './views/recipeViews.js';

//
// import icons from './../img/icons.svg';//paecel 1
import icons from 'url:../img/icons.svg';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import searchViews from './views/searchViews.js';
import resultSView from './views/resultSView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';
import { MODAL_CLOSE_TIME } from './config.js';

// if (module.hot) {
//   module.hot.accept();
// }
const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    // console.log(id);
    if (!id) return;
    recipeView.renderSpinner();

    // updating results view to mark sekected search results
    resultSView.update(model.getSearchResults());
    //loading recipe
    await model.loadRecipe(id);
    //render reciepe
    recipeView.render(model.state.recipe);

    //update bookmarks
    bookmarksView.update(model.state.bookmarks);
  } catch (error) {
    // alert(error);
    console.warn(error);
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultSView.renderSpinner();
    //1,query selection
    const query = searchViews.getQuery();
    if (!query) return;

    //2,load search results
    await model.loadSearchResults(query);
    console.log(model.getSearchResults());
    //render results
    resultSView.render(model.getSearchResults());

    //4,fixing pagination
    paginationView.render(model.state.search);

    searchViews.clearInput()

  } catch (error) {
    // alert(error);
    console.warn(error);
  }
};

const controlPagination = function (goto) {
  //render new results
  resultSView.render(model.getSearchResults(goto));
  //render new pagination
  paginationView.render(model.state.search);
};

const controlServings = function (newServing) {
  //update the recipe serving
  model.updateServing(newServing);

  //update the recipe view
  recipeView.update(model.state.recipe);
  // recipeView.render(model.state.recipe);
};

const controlBookmark = function () {
  //adding and removing bookmarks
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  //updating recipeview
  recipeView.update(model.state.recipe);

  //renderingbookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlAddBookmark = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (recipe) {
  try {
   // Show loading spinner
   addRecipeView.renderSpinner();

  // Upload the new recipe data
    await model.uploadRecipe(recipe);
    //render recipe
    recipeView.render(model.state.recipe);

    //sucess message
    addRecipeView.renderMessage();

    //render bookmark
    bookmarksView.render(model.state.bookmarks);
    //change url
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // close form
    setTimeout(function () {
      addRecipeView.toogleWindow();
    }, MODAL_CLOSE_TIME * 1000);
  } catch (error) {
    console.error(error);
    addRecipeView.renderError(error.message);
  }
};

const init = function () {
  bookmarksView.addBookmarkHandler(controlAddBookmark);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addUpdateServing(controlServings);
  searchViews.addHandelSearch(controlSearchResults);
  paginationView.addPaginationHandler(controlPagination);
  recipeView.addBookmarkHandler(controlBookmark);
  addRecipeView.addHandlerUplode(controlAddRecipe);
};
init();

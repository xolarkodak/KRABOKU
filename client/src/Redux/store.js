import { combineReducers, configureStore } from '@reduxjs/toolkit';
import * as User from './Reducers/userReducers';
import * as categories from './Reducers/CategoriesReducer';
import * as tags from './Reducers/TagsReducer';
import * as movies from './Reducers/Moviesreducer';
import * as news from './Reducers/Newsreducer';

const rootReducer = combineReducers({
  userLogin: User.userLoginReducer,
  userRegister: User.userRegisterReducer,
  userUpdateProfile: User.userUpdateProfileReducer,
  userDeleteProfile: User.userDeleteProfileReducer,
  userchangepassword: User.userChangePasswordReducer,
  userGetFavoriteMovies: User.userGetFavoriteMoviesReducer,
  userDeleteFavoriteMovies: User.userDeleteFavoriteMoviesReducer,
  adminGetAllUsers: User.adminGetAllUsersReducer,
  adminDeleteUser: User.adminDeleteUserReducer,
  userLikeMovie: User.userLikeMovieReducer,

  categoryGetAll: categories.getAllCategoriesReducer,
  categoryCreate: categories.createCategoryReducer,
  categoryUpdate: categories.updateCategoryReducer,
  categoryDelete: categories.deleteCategoryReducer,

  tagsGetAll: tags.getAllTagsReducer,
  tagsCreate: tags.createTagReducer,
  tagsUpdate: tags.updateTagReducer,
  tagsDelete: tags.deleteTagReducer,

  getAllMovies: movies.moviesListReducer,
  getRandomMovies: movies.moviesRandomReducer,
  getMovieById: movies.movieDetailsReducer,
  getTopRatedMovie: movies.movieTopRatedReducer,
  createReview: movies.createReviewReducer,
  deleteMovie: movies.deleteMovieReducer,
  deleteAllMovies: movies.deleteAllMoviesReducer,
  createMovie: movies.createMovieReducer,
  casts: movies.CastsReducer,
  updateMovie: movies.updateMovieReducer,

  getAllNews: news.newsListReducer,
  createNews: news.createNewsReducer
  // getRandomMovies: movies.moviesRandomReducer,
  // getMovieById: movies.movieDetailsReducer,
  // getTopRatedMovie: movies.movieTopRatedReducer,
  // createReview: movies.createReviewReducer,
  // deleteMovie: movies.deleteMovieReducer,
  // deleteAllMovies: movies.deleteAllMoviesReducer,
  // createMovie: movies.createMovieReducer,
  // casts: movies.CastsReducer,
  // updateMovie: movies.updateMovieReducer,

});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
});

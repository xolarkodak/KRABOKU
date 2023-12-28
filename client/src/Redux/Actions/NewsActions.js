import * as moviesConstants from '../Constants/NewsConstants';
import * as newsAPIs from '../APIs/NewsServices';
import toast from 'react-hot-toast';
import { ErrorsAction, tokenProtection } from '../Protection';

export const getAllNewsAction =
  ({
    category = '',
    time = '',
    language = '',
    rate = '',
    year = '',
    search = '',
    pageNumber = '',
  }) =>
  async (dispatch) => {
    try {
      dispatch({ type: moviesConstants.MOVIES_LIST_REQUEST1 });
      const response = await newsAPIs.getAllNewsService(
        category,
        time,
        language,
        rate,
        year,
        search,
        pageNumber,
      );
   
      dispatch({
        type: moviesConstants.MOVIES_LIST_SUCCESS1,
        payload: response,
      });
    } catch (error) {
      ErrorsAction(error, dispatch, moviesConstants.MOVIES_LIST_FAIL1);
    }
  };

export const getRandomMoviesAction = () => async (dispatch) => {
  try {
    dispatch({ type: moviesConstants.MOVIES_RANDOM_REQUEST });
    const response = await newsAPIs.getRandomMoviesService();
    dispatch({
      type: moviesConstants.MOVIES_RANDOM_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, moviesConstants.MOVIES_RANDOM_FAIL);
  }
};

export const getMovieByIdAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: moviesConstants.MOVIE_DETAILS_REQUEST });
    const response = await newsAPIs.getMovieByIdService(id);
    dispatch({
      type: moviesConstants.MOVIE_DETAILS_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, moviesConstants.MOVIE_DETAILS_FAIL);
  }
};

export const getTopRatedMovieAction = () => async (dispatch) => {
  try {
    dispatch({ type: moviesConstants.MOVIE_TOP_RATED_REQUEST });
    const response = await newsAPIs.getTopRatedMovieService();
    dispatch({
      type: moviesConstants.MOVIE_TOP_RATED_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, moviesConstants.MOVIE_TOP_RATED_FAIL);
  }
};

export const reviewMovieAction =
  ({ id, review }) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: moviesConstants.CREATE_REVIEW_REQUEST });
      const response = await newsAPIs.reviewMovieService(tokenProtection(getState), id, review);
      dispatch({
        type: moviesConstants.CREATE_REVIEW_SUCCESS,
        payload: response,
      });
      toast.success('Відгук успішно доданий');
      dispatch({ type: moviesConstants.CREATE_REVIEW_RESET });
      dispatch(getMovieByIdAction(id));
    } catch (error) {
      ErrorsAction(error, dispatch, moviesConstants.CREATE_REVIEW_FAIL);
    }
  };

export const deleteMovieAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: moviesConstants.DELETE_MOVIE_REQUEST });
    const response = await newsAPIs.deleteMovieService(tokenProtection(getState), id);
    dispatch({
      type: moviesConstants.DELETE_MOVIE_SUCCESS,
      payload: response,
    });
    toast.success('Новину успішно видалено');
    dispatch(getAllNewsAction({}));
  } catch (error) {
    ErrorsAction(error, dispatch, moviesConstants.DELETE_MOVIE_FAIL);
  }
};

export const deleteAllMoviesAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: moviesConstants.DELETE_ALL_MOVIES_REQUEST });
    const response = await newsAPIs.deleteAllMoviesService(tokenProtection(getState));
    dispatch({
      type: moviesConstants.DELETE_ALL_MOVIES_SUCCESS,
      payload: response,
    });
    toast.success('Усі новини успішно видалено');
    dispatch(getAllNewsAction({}));
  } catch (error) {
    ErrorsAction(error, dispatch, moviesConstants.DELETE_ALL_MOVIES_FAIL);
  }
};

export const createMovieAction = (movie) => async (dispatch, getState) => {
  try {
    dispatch({ type: moviesConstants.CREATE_MOVIE_REQUEST });
    const response = await newsAPIs.createMovieService(tokenProtection(getState), movie);
    dispatch({
      type: moviesConstants.CREATE_MOVIE_SUCCESS,
      payload: response,
    });
    toast.success('Новину успішно створено');
    dispatch(deleteAllCastAction());
  } catch (error) {
    ErrorsAction(error, dispatch, moviesConstants.CREATE_MOVIE_FAIL);
  }
};

export const addCastAction = (cast) => async (dispatch, getState) => {
  dispatch({ type: moviesConstants.ADD_CAST, payload: cast });
  localStorage.setItem('casts', JSON.stringify(getState().casts.casts));
};

export const removeCastAction = (id) => async (dispatch, getState) => {
  dispatch({ type: moviesConstants.DELETE_CAST, payload: id });
  localStorage.setItem('casts', JSON.stringify(getState().casts.casts));
};

export const updateCastAction = (cast) => async (dispatch, getState) => {
  dispatch({ type: moviesConstants.EDIT_CAST, payload: cast });
  localStorage.setItem('casts', JSON.stringify(getState().casts.casts));
};

export const deleteAllCastAction = () => async (dispatch) => {
  dispatch({ type: moviesConstants.RESET_CAST });
  localStorage.removeItem('casts');
};

export const updateMovieAction = (id, movie) => async (dispatch, getState) => {
  try {
    dispatch({ type: moviesConstants.UPDATE_MOVIE_REQUEST });
    const response = await newsAPIs.updateMovieService(tokenProtection(getState), id, movie);
    dispatch({
      type: moviesConstants.UPDATE_MOVIE_SUCCESS,
      payload: response,
    });
    toast.success('Новину успішно оновлено');
    dispatch(getMovieByIdAction(id));
    dispatch(deleteAllCastAction());
  } catch (error) {
    ErrorsAction(error, dispatch, moviesConstants.UPDATE_MOVIE_FAIL);
  }
};

import * as newsConstants from '../Constants/NewsConstants';
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
      dispatch({ type: newsConstants.NEWS_LIST_REQUEST });
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
        type: newsConstants.NEWS_LIST_SUCCESS,
        payload: response,
      });
    } catch (error) {
      ErrorsAction(error, dispatch, newsConstants.NEWS_LIST_FAIL);
    }
  };

export const getNewsByIdAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: newsConstants.NEWS_DETAILS_REQUEST });
    const response = await newsAPIs.getNewsByIdService(id);
    dispatch({
      type: newsConstants.NEWS_DETAILS_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, newsConstants.NEWS_DETAILS_FAIL);
  }
};

export const reviewNewsAction =
  ({ id, review }) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: newsConstants.CREATE_REVIEW_NEWS_REQUEST });
      const response = await newsAPIs.reviewNewsService(tokenProtection(getState), id, review);
      dispatch({
        type: newsConstants.CREATE_REVIEW_NEWS_SUCCESS,
        payload: response,
      });
      toast.success('Відгук успішно доданий');
      dispatch({ type: newsConstants.CREATE_REVIEW_NEWS_RESET });
      dispatch(getNewsByIdAction(id));
    } catch (error) {
      ErrorsAction(error, dispatch, newsConstants.CREATE_REVIEW_NEWS_FAIL);
    }
  };

export const deleteNewsAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: newsConstants.DELETE_NEWS_REQUEST });
    const response = await newsAPIs.deleteNewsService(tokenProtection(getState), id);
    dispatch({
      type: newsConstants.DELETE_NEWS_SUCCESS,
      payload: response,
    });
    toast.success('Новину успішно видалено');
    dispatch(getAllNewsAction({}));
  } catch (error) {
    ErrorsAction(error, dispatch, newsConstants.DELETE_NEWS_FAIL);
  }
};

export const deleteAllNewsAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: newsConstants.DELETE_ALL_NEWS_REQUEST });
    const response = await newsAPIs.deleteAllNewsService(tokenProtection(getState));
    dispatch({
      type: newsConstants.DELETE_ALL_NEWS_SUCCESS,
      payload: response,
    });
    toast.success('Усі новини успішно видалено');
    dispatch(getAllNewsAction({}));
  } catch (error) {
    ErrorsAction(error, dispatch, newsConstants.DELETE_ALL_NEWS_FAIL);
  }
};

export const createNewsAction = (news) => async (dispatch, getState) => {
  try {
    dispatch({ type: newsConstants.CREATE_NEWS_REQUEST });
    const response = await newsAPIs.createNewsService(tokenProtection(getState), news);
    dispatch({
      type: newsConstants.CREATE_NEWS_SUCCESS,
      payload: response,
    });
    toast.success('Новину успішно створено');
    dispatch(getAllNewsAction({}));
  } catch (error) {
    ErrorsAction(error, dispatch, newsConstants.CREATE_NEWS_FAIL);
  }
};

export const updateNewsAction = (id, news) => async (dispatch, getState) => {
  try {
    dispatch({ type: newsConstants.UPDATE_NEWS_REQUEST });
    const response = await newsAPIs.updateNewsService(tokenProtection(getState), id, news);
    dispatch({
      type: newsConstants.UPDATE_NEWS_SUCCESS,
      payload: response,
    });
    toast.success('Новину успішно оновлено');
    dispatch(getNewsByIdAction(id));
    dispatch(getAllNewsAction({}));
  } catch (error) {
    ErrorsAction(error, dispatch, newsConstants.UPDATE_NEWS_FAIL);
  }
};

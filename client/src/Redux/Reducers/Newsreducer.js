import * as newsConstants from '../Constants/NewsConstants';

export const newsListReducer = (state = { news: [] }, action) => {
  switch (action.type) {
    case newsConstants.NEWS_LIST_REQUEST:
      return { isLoading: true };
    case newsConstants.NEWS_LIST_SUCCESS:
      return {
        isLoading: false,
        news: action.payload.news,
        pages: action.payload.pages,
        page: action.payload.page,
        totalNews: action.payload.totalNews,
      };
    case newsConstants.NEWS_LIST_FAIL:
      return { isLoading: false, isError: action.payload };
    default:
      return state;
  }
};

export const newsDetailsReducer = (state = { news_: {} }, action) => {
  switch (action.type) {
    case newsConstants.NEWS_DETAILS_REQUEST:
      return { isLoading: true };
    case newsConstants.NEWS_DETAILS_SUCCESS:
      return { isLoading: false, news_: action.payload };
    case newsConstants.NEWS_DETAILS_FAIL:
      return { isLoading: false, isError: action.payload };
    case newsConstants.NEWS_DETAILS_RESET:
      return { news_: {} };
    default:
      return state;
  }
};

export const createReviewNewsReducer = (state = {}, action) => {
  switch (action.type) {
    case newsConstants.CREATE_REVIEW_NEWS_REQUEST:
      return { isLoading: true };
    case newsConstants.CREATE_REVIEW_NEWS_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case newsConstants.CREATE_REVIEW_NEWS_FAIL:
      return { isLoading: false, isError: action.payload };
    case newsConstants.CREATE_REVIEW_NEWS_RESET:
      return {};
    default:
      return state;
  }
};

export const deleteNewsReducer = (state = {}, action) => {
  switch (action.type) {
    case newsConstants.DELETE_NEWS_REQUEST:
      return { isLoading: true };
    case newsConstants.DELETE_NEWS_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case newsConstants.DELETE_NEWS_FAIL:
      return { isLoading: false, isError: action.payload };
    default:
      return state;
  }
};

export const deleteAllNewsReducer = (state = {}, action) => {
  switch (action.type) {
    case newsConstants.DELETE_ALL_NEWS_REQUEST:
      return { isLoading: true };
    case newsConstants.DELETE_ALL_NEWS_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case newsConstants.DELETE_ALL_NEWS_FAIL:
      return { isLoading: false, isError: action.payload };
    default:
      return state;
  }
};

export const createNewsReducer = (state = {}, action) => {
  switch (action.type) {
    case newsConstants.CREATE_NEWS_REQUEST:
      return { isLoading: true };
    case newsConstants.CREATE_NEWS_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case newsConstants.CREATE_NEWS_FAIL:
      return { isLoading: false, isError: action.payload };
    case newsConstants.CREATE_NEWS_RESET:
      return {};
    default:
      return state;
  }
};

export const updateNewsReducer = (state = {}, action) => {
  switch (action.type) {
    case newsConstants.UPDATE_NEWS_REQUEST:
      return { isLoading: true };
    case newsConstants.UPDATE_NEWS_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case newsConstants.UPDATE_NEWS_FAIL:
      return { isLoading: false, isError: action.payload };
    case newsConstants.UPDATE_NEWS_RESET:
      return {};
    default:
      return state;
  }
};

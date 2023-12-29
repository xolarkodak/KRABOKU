import * as TagsConstants from "../Constants/TagsConstants";

export const getAllTagsReducer = (state = { tags: [] }, action) => {
  switch (action.type) {
    case TagsConstants.GET_ALL_TAGS_REQUEST:
      return { isLoading: true };
    case TagsConstants.GET_ALL_TAGS_SUCCESS:
      return { isLoading: false, tags: action.payload };
    case TagsConstants.GET_ALL_TAGS_FAIL:
      return { isLoading: false, isError: action.payload };
    default:
      return state;
  }
};

export const createTagReducer = (state = {}, action) => {
  switch (action.type) {
    case TagsConstants.CREATE_TAG_REQUEST:
      return { isLoading: true };
    case TagsConstants.CREATE_TAG_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case TagsConstants.CREATE_TAG_FAIL:
      return { isLoading: false, isError: action.payload };
    case TagsConstants.CREATE_TAG_RESET:
      return {};
    default:
      return state;
  }
};

export const updateTagReducer = (state = {}, action) => {
  switch (action.type) {
    case TagsConstants.UPDATE_TAG_REQUEST:
      return { isLoading: true };
    case TagsConstants.UPDATE_TAG_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case TagsConstants.UPDATE_TAG_FAIL:
      return { isLoading: false, isError: action.payload };
    case TagsConstants.UPDATE_TAG_RESET:
      return {};
    default:
      return state;
  }
};

export const deleteTagReducer = (state = {}, action) => {
  switch (action.type) {
    case TagsConstants.DELETE_TAG_REQUEST:
      return { isLoading: true };
    case TagsConstants.DELETE_TAG_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case TagsConstants.DELETE_TAG_FAIL:
      return { isLoading: false, isError: action.payload };
    case TagsConstants.DELETE_TAG_RESET:
      return {};
    default:
      return state;
  }
};


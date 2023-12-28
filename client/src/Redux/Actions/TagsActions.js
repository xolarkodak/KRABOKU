import * as TagsConstants from "../Constants/TagsConstants";
import * as tagsAPIs from "../APIs/TagsServices";
import toast from "react-hot-toast";
import { ErrorsAction, tokenProtection } from "../Protection";

export const getAllTagsAction = () => async (dispatch) => {
  try {
    dispatch({ type: TagsConstants.GET_ALL_TAGS_REQUEST });
    const data = await tagsAPIs.getTagsService();
    dispatch({
      type: TagsConstants.GET_ALL_TAGS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, TagsConstants.GET_ALL_TAGS_FAIL);
  }
};

export const createTagAction = (title) => async (dispatch, getState) => {
  try {
    dispatch({ type: TagsConstants.CREATE_TAG_REQUEST });
    await tagsAPIs.createTagService(
      title,
      tokenProtection(getState)
    );
    dispatch({ type: TagsConstants.CREATE_TAG_SUCCESS });
    toast.success("Тег створено успішно");
    dispatch(getAllTagsAction());
  } catch (error) {
    ErrorsAction(error, dispatch, TagsConstants.CREATE_TAG_FAIL);
  }
};

export const updateTagAction =
  (id, title) => async (dispatch, getState) => {
    try {
      dispatch({ type: TagsConstants.UPDATE_TAG_REQUEST });
      await tagsAPIs.updateTagService(
        id,
        title,
        tokenProtection(getState)
      );
      dispatch({ type: TagsConstants.UPDATE_TAG_SUCCESS });
      toast.success("Тег успішно оновлено");
      dispatch(getAllTagsAction());
    } catch (error) {
      ErrorsAction(error, dispatch, TagsConstants.UPDATE_TAG_FAIL);
    }
  };

export const deleteTagAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: TagsConstants.DELETE_TAG_REQUEST });
    await tagsAPIs.deleteTagService(id, tokenProtection(getState));
    dispatch({ type: TagsConstants.DELETE_TAG_SUCCESS });
    toast.success("Тег успішно видалено");
    dispatch(getAllTagsAction());
  } catch (error) {
    ErrorsAction(error, dispatch, TagsConstants.DELETE_TAG_FAIL);
  }
};

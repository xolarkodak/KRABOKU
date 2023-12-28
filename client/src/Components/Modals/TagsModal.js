import React, { useEffect, useState } from "react";
import MainModal from "./MainModal";
import { Input } from "../UsedInputs";
import { useDispatch, useSelector } from "react-redux";
import {
  createTagAction,
  updateTagAction,
} from "../../Redux/Actions/TagsActions";
import toast from "react-hot-toast";

function TagModal({ modalOpen, setModalOpen, tag }) {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const { isLoading, isError, isSuccess } = useSelector(
    (state) => state.tagsCreate
  );
  const {
    isLoading: upLoading,
    isError: upError,
    isSuccess: upSuccess,
  } = useSelector((state) => state.tagsUpdate);

  const submitHandler = (e) => {
    e.preventDefault();
    if (title) {
      if (tag) {
        dispatch(updateTagAction(tag?._id, { title: title }));
        setModalOpen(!modalOpen);
      } else {
        dispatch(createTagAction({ title: title }));
        setTitle("");
        setModalOpen(!modalOpen);
      }
    } else {
      toast.error("Будь ласка, напишіть назву категорії");
    }
  };

  useEffect(() => {
    if (upError || isError) {
      toast.error(upError || isError);
      dispatch({
        type: isError ? "CREATE_TAG_RESET" : "UPDATE_TAG_RESET",
      });
    }

    if (isSuccess || upSuccess) {
      dispatch({
        type: isError ? "CREATE_TAG_RESET" : "UPDATE_TAG_RESET",
      });
    }

    if (tag) {
      setTitle(tag?.title);
    }

    if (modalOpen === false) {
      setTitle("");
    }
  }, [dispatch, isError, isSuccess, upSuccess, upError, tag, modalOpen]);

  return (
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div className="inline-block sm:w-4/5 border border-border md:w-3/5 lg:w-2/5 w-full align-middle p-10 overflow-y-auto h-full bg-main text-white rounded-2xl">
        <h2 className="text-3xl font-bold">{tag ? "Оновити" : "Створити"}</h2>
        <form
          className="flex flex-col gap-6 text-left mt-6"
          onSubmit={submitHandler}
        >
          <Input
            label="Назва тегу"
            placeholder={"Інсайд"}
            type="text"
            bg={false}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            disabled={isLoading || upLoading}
            type="submit"
            className="w-full flex-rows gap-4 py-3 text-lg transitions hover:bg-dry border-2 border-subMain rounded bg-subMain text-white"
          >
            {isLoading || upLoading
              ? "Завантаження...."
              : tag
              ? "Оновлення"
              : "Створити"}
          </button>
        </form>
      </div>
    </MainModal>
  );
}

export default TagModal;

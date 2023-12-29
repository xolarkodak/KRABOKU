import React, { useEffect, useState } from "react";
import { HiPlusCircle } from "react-icons/hi";
import Table2 from "../../../Components/Table2";
import SideBar from "../SideBar";
import TagsModal from "../../../Components/Modals/TagsModal";
import { useDispatch, useSelector } from "react-redux";
import { deleteTagAction } from "../../../Redux/Actions/TagsActions";
import Loader from "../../../Components/Notfications/Loader";
import { Empty } from "../../../Components/Notfications/Empty";
import toast from "react-hot-toast";

function Tags() {
  const [modalOpen, setModalOpen] = useState(false);
  const [tag, setTag] = useState();
  const dispatch = useDispatch();

  const { tags, isLoading } = useSelector(
    (state) => state.tagsGetAll
  );
  
  const { isSuccess, isError } = useSelector((state) => state.tagsDelete);
  const adminDeletetag = (id) => {
    if (window.confirm("Ви впевнені, що хочете видалити цей тег?")) {
      dispatch(deleteTagAction(id));
    }
  };

  const OnEditFunction = (id) => {
    setTag(id);
    setModalOpen(!modalOpen);
  };

  useEffect(() => {
      
    if (isError) {
      toast.error(isError);
      dispatch({ type: "DELETE_TAG_RESET" });
    }
    if (isSuccess) {
      dispatch({ type: "DELETE_TAG_RESET" });
    }

    if (modalOpen === false) {
      setTag();
    }
  }, [modalOpen, dispatch, isError, isSuccess]);

  return (
    <SideBar>
      <TagsModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        tag={tag}
      />
      <div className="flex flex-col gap-6">
        <div className="flex-btn gap-2">
          <h2 className="text-xl font-bold">Теги</h2>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-subMain flex-rows gap-4 font-medium transitions hover:bg-main border border-subMain text-white py-2 px-4 rounded"
          >
            <HiPlusCircle /> Створити
          </button>
        </div>

        {isLoading ? (
          <Loader />
        ) : tags?.length > 0 ? (
          <Table2
            data={tags}
            users={false}
            OnEditFunction={OnEditFunction}
            onDeleteFunction={adminDeletetag}
          />
        ) : (
          <Empty message="У вас немає тегів" />
        )}
      </div>
    </SideBar>
  );
}

export default Tags;

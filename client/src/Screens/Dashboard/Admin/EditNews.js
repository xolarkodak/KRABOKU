import React, { useEffect, useState } from "react";
import Uploder from "../../../Components/Uploder";
import { Input, Message, Select } from "../../../Components/UsedInputs";
import SideBar from "../SideBar";
import { ImUpload } from "react-icons/im";
import CastsModal from "../../../Components/Modals/CastsModal";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { newsValidation } from '../../../Components/Validation/NewsValidation';
import {
  getMovieByIdAction,
  updateMovieAction,
} from "../../../Redux/Actions/NewsActions";
import toast from "react-hot-toast";
import { InlineError } from "../../../Components/Notfications/Error";
import { Imagepreview } from "../../../Components/Imagepreview";
import Loader from "../../../Components/Notfications/Loader";
import { RiMovie2Line } from "react-icons/ri";
import { getAllTagsAction } from "../../../Redux/Actions/TagsActions";

function EditMovie() {
  const sameClass = "w-full gap-6 flex-colo min-h-screen";
  const [modalOpen, setModalOpen] = useState(false);
  const [cast, setCast] = useState(null);
  const [imageWithoutTitle, setImageWithoutTitle] = useState("");
  const [imageTitle, setImageTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();


  const { categories } = useSelector((state) => state.tagsGetAll);
  const { isLoading, isError, movie } = useSelector(
    (state) => state.getMovieById
  );
  const {
    isLoading: editLoading,
    isError: editError,
    isSuccess,
  } = useSelector((state) => state.updateMovie);
  const { casts } = useSelector((state) => state.casts);


  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(newsValidation),
  });


  const onSubmit = (data) => {
    dispatch(
      updateMovieAction(movie?._id, {
        ...data,
        image: imageWithoutTitle,
        titleImage: imageTitle,
        video: videoUrl,
        casts: casts.length > 0 ? casts : movie?.casts,
      })
    );
  };




  useEffect(() => {
    dispatch(getAllTagsAction());

    if (movie?._id !== id) {
      dispatch(getMovieByIdAction(id));
    } else {
      setValue("name", movie?.name);
      setValue("time", movie?.time);
      setValue("language", movie?.language);
      setValue("year", movie?.year);
      setValue("category", movie?.category);
      setValue("desc", movie?.desc);
      setImageWithoutTitle(movie?.image);
      setImageTitle(movie?.titleImage);
      setVideoUrl(movie?.video);
    }
    if (modalOpen === false) {
      setCast();
    }
    if (isSuccess) {
      dispatch({ type: "UPDATE_MOVIE_RESET" });
      navigate(`/editnews/${id}`);
    }
    if (editError) {
      toast.error("Щось пішло не так");
      dispatch({ type: "UPDATE_MOVIE_RESET" });
    }
  }, [
    dispatch,
    id,
    movie,
    modalOpen,
    setValue,
    isSuccess,
    editError,
    navigate,
  ]);

  return (
    <SideBar>
      <CastsModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        cast={cast}
      />
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <div className={sameClass}>
          <div className="flex-colo w-24 h-24 p-5 mb-4 rounded-full bg-dry text-subMain text-4xl">
            <RiMovie2Line />
          </div>
          <p className="text-border text-sm">Щось пішло не так</p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <h2 className="text-xl font-bold">Змінити новину"{movie?.name}"</h2>
          <div className="w-full grid md:grid-cols-2 gap-6">
            <div className="w-full">
              <Input
                label="Заголовок"
                placeholder="Титанік втопився"
                type="text"
                bg={true}
                name="name"
                register={register("name")}
              />
              {errors.name && <InlineError text={errors.name.message} />}
            </div>
            <div className="w-full">
              <Input
                label="Тривалість читання"
                placeholder="10 хв"
                type="number"
                bg={true}
                name="time"
                register={register("time")}
              />
              {errors.time && <InlineError text={errors.time.message} />}
            </div>
          </div>

          <div className="w-full grid md:grid-cols-2 gap-6">
            <div className="w-full">
              <Input
                label="Мова тексту"
                placeholder="Українська"
                type="text"
                bg={true}
                name="language"
                register={register("language")}
              />
              {errors.language && (
                <InlineError text={errors.language.message} />
              )}
            </div>
            <div className="w-full">
              <Input
                label="Дата публікації"
                placeholder="12.12.47"
                type="number"
                bg={true}
                name="year"
                register={register("year")}
              />
              {errors.year && <InlineError text={errors.year.message} />}
            </div>
          </div>

          <div className="w-full grid md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <p className="text-border font-semibold text-sm">
              Зображення новини 1
              </p>
              <Uploder setImageUrl={setImageWithoutTitle} />
              <Imagepreview image={imageWithoutTitle} name="imageWithouTitle" />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-border font-semibold text-sm">
              Зображення новини 2
              </p>
              <Uploder setImageUrl={setImageTitle} />
              <Imagepreview image={imageTitle} name="imageTitle" />
            </div>
          </div>
          <div className="w-full">
            <Message
              label="Опис новини"
              placeholder="Нехай це буде коротко і ясно"
              name="desc"
              register={{ ...register("desc") }}
            />
            {errors.desc && <InlineError text={errors.desc.message} />}
          </div>

          <div className="text-sm w-full">
            <Select
              label="Тег"
              options={categories?.length > 0 ? categories : []}
              name="category"
              register={{ ...register("category") }}
            />
            {errors.category && <InlineError text={errors.category.message} />}
          </div>

          
          
          <button
            disabled={editLoading}
            onClick={handleSubmit(onSubmit)}
            className="bg-subMain w-full flex-rows gap-6 font-medium text-white py-4 rounded"
          >
            {editLoading ? (
              "Оновлення..."
            ) : (
              <>
                <ImUpload /> Оновити новину
              </>
            )}
          </button>
        </div>
      )}
    </SideBar>
  );
}

export default EditMovie;

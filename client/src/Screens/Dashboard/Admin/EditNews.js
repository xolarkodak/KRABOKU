import React, { useEffect, useState } from 'react';
import Uploder from '../../../Components/Uploder';
import { Input, Message, Select } from '../../../Components/UsedInputs';
import SideBar from '../SideBar';
import { ImUpload } from 'react-icons/im';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { newsValidation } from '../../../Components/Validation/NewsValidation';
import { getNewsByIdAction, updateNewsAction } from '../../../Redux/Actions/NewsActions';
import toast from 'react-hot-toast';
import { InlineError } from '../../../Components/Notfications/Error';
import { Imagepreview } from '../../../Components/Imagepreview';
import Loader from '../../../Components/Notfications/Loader';
import { RiMovie2Line } from 'react-icons/ri';
import { getAllTagsAction } from '../../../Redux/Actions/TagsActions';

function EditNews() {
  const sameClass = 'w-full gap-6 flex-colo min-h-screen';
  const [modalOpen, setModalOpen] = useState(false);
  const [imageWithoutTitle, setImageWithoutTitle] = useState('');
  const [imageTitle, setImageTitle] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { tags } = useSelector((state) => state.tagsGetAll);
  const { isLoading, isError, news_ } = useSelector((state) => state.getNewsById);
  const {
    isLoading: editLoading,
    isError: editError,
    isSuccess,
  } = useSelector((state) => state.updateNews);

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
      updateNewsAction(news_?._id, {
        ...data,
        image: imageWithoutTitle,
        titleImage: imageTitle,
      }),
    );
  };

  useEffect(() => {
    dispatch(getAllTagsAction());

    if (news_?._id !== id) {
      dispatch(getNewsByIdAction(id));
    } else {
      setValue('name', news_?.name);
      setValue('time', news_?.time);
      setValue('language', news_?.language);
      setValue('year', news_?.year);
      setValue('tag', news_?.tag);
      setValue('desc', news_?.desc);
      setImageWithoutTitle(news_?.image);
      setImageTitle(news_?.titleImage);
    }

    if (isSuccess) {
      dispatch({ type: 'UPDATE_NEWS_RESET' });
      navigate(`/editnews/${id}`);
    }
    if (editError) {
      toast.error('Щось пішло не так');
      dispatch({ type: 'UPDATE_NEWS_RESET' });
    }
  }, [dispatch, id, news_, modalOpen, setValue, isSuccess, editError, navigate]);

  return (
    <SideBar>
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
          <h2 className="text-xl font-bold">Змінити новину"{news_?.name}"</h2>
          <div className="w-full grid md:grid-cols-2 gap-6">
            <div className="w-full">
              <Input
                label="Заголовок"
                placeholder="Титанік втопився"
                type="text"
                bg={true}
                name="name"
                register={register('name')}
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
                register={register('time')}
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
                register={register('language')}
              />
              {errors.language && <InlineError text={errors.language.message} />}
            </div>
            <div className="w-full">
              <Input
                label="Дата публікації"
                placeholder="12.12.47"
                type="number"
                bg={true}
                name="year"
                register={register('year')}
              />
              {errors.year && <InlineError text={errors.year.message} />}
            </div>
          </div>

          <div className="w-full grid md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <p className="text-border font-semibold text-sm">Зображення новини 1</p>
              <Uploder setImageUrl={setImageWithoutTitle} />
              <Imagepreview image={imageWithoutTitle} name="imageWithouTitle" />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-border font-semibold text-sm">Зображення новини 2</p>
              <Uploder setImageUrl={setImageTitle} />
              <Imagepreview image={imageTitle} name="imageTitle" />
            </div>
          </div>
          <div className="w-full">
            <Message
              label="Опис новини"
              placeholder="Нехай це буде коротко і ясно"
              name="desc"
              register={{ ...register('desc') }}
            />
            {errors.desc && <InlineError text={errors.desc.message} />}
          </div>

          <div className="text-sm w-full">
            <Select
              label="Тег"
              options={tags?.length > 0 ? tags : []}
              name="tag"
              register={{ ...register('tag') }}
            />
            {errors.tag && <InlineError text={errors.tag.message} />}
          </div>

          <button
            disabled={editLoading}
            onClick={handleSubmit(onSubmit)}
            className="bg-subMain w-full flex-rows gap-6 font-medium text-white py-4 rounded">
            {editLoading ? (
              'Оновлення...'
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

export default EditNews;

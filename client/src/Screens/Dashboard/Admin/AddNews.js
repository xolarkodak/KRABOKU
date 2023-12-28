import React, { useEffect, useState } from 'react';
import Uploder from '../../../Components/Uploder';
import { Input, Message, Select } from '../../../Components/UsedInputs';
import SideBar from '../SideBar';

import { ImUpload } from 'react-icons/im';
import CastsModal from '../../../Components/Modals/CastsModal';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { newsValidation } from '../../../Components/Validation/NewsValidation';
import { createMovieAction, getAllNewsAction } from '../../../Redux/Actions/NewsActions';
import toast from 'react-hot-toast';
import { InlineError } from '../../../Components/Notfications/Error';
import { Imagepreview } from '../../../Components/Imagepreview';
import { getAllTagsAction } from "../../../Redux/Actions/TagsActions";

function AddMovie() {
  const [modalOpen, setModalOpen] = useState(false);
  const [cast, setCast] = useState(null);
  const [imageWithoutTitle, setImageWithoutTitle] = useState('');
  const [imageTitle, setImageTitle] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { tags } = useSelector((state) => state.tagsGetAll);
  const { isLoading, isError, isSuccess } = useSelector((state) => state.createNews);
  const { casts } = useSelector((state) => state.casts);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(newsValidation),
  });

  const onSubmit = (data) => {
    dispatch(
      createMovieAction({
        ...data,
        image: imageWithoutTitle ? imageWithoutTitle : '/images/user.jpg',
        titleImage: imageTitle ? imageTitle : '/images/user.jpg',
      }),
    );
  };



  useEffect(() => {
    dispatch(getAllTagsAction());
    if (modalOpen === false) {
      setCast();
    }
    if (isSuccess) {
      reset({
        name: '',
        time: 0,
        language: '',
        year: 0,
        tags: '',
        desc: '',
      });
      dispatch(getAllNewsAction({}));
      setImageTitle('');
      setImageWithoutTitle('');
      setVideoUrl('');
      dispatch({ type: 'CREATE_MOVIE_RESET' });
      navigate('/addnews');
    }

    if (isError) {
      toast.error('Щось пішло не так.');
      dispatch({ type: 'CREATE_MOVIE_RESET' });
    }
  }, [modalOpen, isSuccess, isError, dispatch, reset, navigate]);

  return (
    <SideBar>
      <CastsModal modalOpen={modalOpen} setModalOpen={setModalOpen} cast={cast} />
      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-bold">Створити новину</h2>
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
            placeholder="Зробіть його коротким і солодким"
            name="desc"
            register={{ ...register('desc') }}
          />
          {errors.desc && <InlineError text={errors.desc.message} />}
        </div>

        <div className="text-sm w-full">
          <Select
            label="Тег"
            options={tags?.length > 0 ? tags : []}
            name="category"
            register={{ ...register('category') }}
          />
          {errors.tags && <InlineError text={errors.tags.message} />}
        </div>

       
        
        <button
          disabled={isLoading}
          onClick={handleSubmit(onSubmit)}
          className="bg-subMain w-full flex-rows gap-6 font-medium text-white py-4 rounded">
          {isLoading ? (
            'Будь ласка, зачекайте....'
          ) : (
            <>
              <ImUpload /> Опублікувати новину
            </>
          )}
        </button>
      </div>
    </SideBar>
  );
}

export default AddMovie;

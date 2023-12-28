import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NewsInfo from '../Components/Single/NewsInfo';
import NewsRates from '../Components/Single/NewsRates';
import Layout from '../Layout/Layout';
import ShareMovieModal from '../Components/Modals/ShareModal';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Components/Notfications/Loader';
import { RiMovie2Line } from 'react-icons/ri';
import { SidebarContext } from '../Context/DrawerContext';

function SingleNews() {
  const [modalOpen, setModalOpen] = useState(false);
  const { progress, setprogress } = useContext(SidebarContext);
  const { id } = useParams();
  const dispatch = useDispatch();
  const sameClass = 'w-full gap-6 flex-colo min-h-screen';
  const { isLoading, isError, news_ } = useSelector((state) => state.getNewsById);

  useEffect(() => {
    dispatch(getNewsByIdAction(id));
  }, [dispatch, id]);

  return (
    <Layout>
      {isLoading ? (
        <div className={sameClass}>
          <Loader />
        </div>
      ) : isError ? (
        <div className={sameClass}>
          <div className="flex-colo w-24 h-24 p-5 mb-4 rounded-full bg-dry text-subMain text-4xl">
            <RiMovie2Line />
          </div>
          <p className="text-border text-sm">Щось пішло не так.</p>
        </div>
      ) : (
        <>
          <ShareMovieModal modalOpen={modalOpen} setModalOpen={setModalOpen} news_={news_} />
          <NewsInfo news_={news_} setModalOpen={setModalOpen} progress={progress} />
          <div className="container mx-auto min-h-screen px-2 my-6">
            <NewsRates news_={news_} />
          </div>
        </>
      )}
    </Layout>
  );
}

export default SingleNews;

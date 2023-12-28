import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NewsInfo from '../Components/Single/NewsInfo';
import NewsRates from '../Components/Single/NewsRates';
import Layout from '../Layout/Layout';
import ShareMovieModal from '../Components/Modals/ShareModal';
import { useDispatch, useSelector } from 'react-redux';
import { getMovieByIdAction } from '../Redux/Actions/NewsActions';
import Loader from '../Components/Notfications/Loader';
import { RiMovie2Line } from 'react-icons/ri';
import { SidebarContext } from '../Context/DrawerContext';
import { DownloadVideo } from '../Context/Functionalities';
import FileSaver from 'file-saver';

function SingleNews() {
  const [modalOpen, setModalOpen] = useState(false);
  const { progress, setprogress } = useContext(SidebarContext);
  const { id } = useParams();
  const dispatch = useDispatch();
  const sameClass = 'w-full gap-6 flex-colo min-h-screen';
  const { isLoading, isError, movie } = useSelector((state) => state.getMovieById);
  const { movies } = useSelector((state) => state.getAllMovies);
  const RelatedMovies = movies?.filter((m) => m.category === movie?.category);

  const DownloadMovieVideo = async (videoUrl, name) => {
    await DownloadVideo(videoUrl, setprogress).then((data) => {
      setprogress(0);
      FileSaver.saveAs(data, name);
    });
  };

  useEffect(() => {
    dispatch(getMovieByIdAction(id));
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
          <ShareMovieModal modalOpen={modalOpen} setModalOpen={setModalOpen} movie={movie} />
          <NewsInfo
            movie={movie}
            setModalOpen={setModalOpen}
            DownloadVideo={DownloadMovieVideo}
            progress={progress}
          />
          <div className="container mx-auto min-h-screen px-2 my-6">
          <NewsRates movie={movie} />
          </div>
        </>
      )}
    </Layout>
  );
}

export default SingleNews;

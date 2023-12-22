import React, { useContext, useEffect } from 'react';
import Table from '../../Components/Table';
import SideBar from './SideBar';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteFavoriteMoviesAction,
  getFavoriteMoviesAction,
} from '../../Redux/Actions/userActions';
import toast from 'react-hot-toast';
import Loader from '../../Components/Notfications/Loader';
import { Empty } from '../../Components/Notfications/Empty';
import { SidebarContext } from '../../Context/DrawerContext';
import { DownloadVideo } from '../../Context/Functionalities';
import FileSaver from 'file-saver';

function FavoritesMovies() {
  const dispatch = useDispatch();
  const { progress, setprogress } = useContext(SidebarContext);
  const { isLoading, isError, likedMovies } = useSelector((state) => state.userGetFavoriteMovies);
  const {
    isLoading: deleteLoading,
    isError: deleteError,
    isSuccess,
  } = useSelector((state) => state.userDeleteFavoriteMovies);

  const deleteMoviesHandler = () => {
    window.confirm('Ви впевнені, що хочете видалити всі фільми?') &&
      dispatch(deleteFavoriteMoviesAction());
  };

  const DownloadMovieVideo = async (videoUrl, name) => {
    await DownloadVideo(videoUrl, setprogress).then((data) => {
      setprogress(0);
      FileSaver.saveAs(data, name);
    });
  };

  useEffect(() => {
    dispatch(getFavoriteMoviesAction());
    if (isError || deleteError) {
      toast.error(isError || deleteError);
      dispatch({
        type: isError ? 'GET_FAVORITE_MOVIES_RESET' : 'DELETE_FAVORITE_MOVIES_RESET',
      });
    }
  }, [dispatch, isError, deleteError, isSuccess]);

  return (
    <SideBar>
      <div className="flex flex-col gap-6">
        <div className="flex-btn gap-2">
          <h2 className="text-xl font-bold">Вибрані фільми</h2>
          {likedMovies?.length > 0 && (
            <button
              disabled={deleteLoading}
              onClick={deleteMoviesHandler}
              className="bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded">
              {deleteLoading ? 'Видалення...' : 'Видалити все'}
            </button>
          )}
        </div>
        {isLoading ? (
          <Loader />
        ) : likedMovies.length > 0 ? (
          <Table
            data={likedMovies}
            admin={false}
            downloadVideo={DownloadMovieVideo}
            progress={progress}
          />
        ) : (
          <Empty message="У вас немає улюблених фільмів" />
        )}
      </div>
    </SideBar>
  );
}

export default FavoritesMovies;

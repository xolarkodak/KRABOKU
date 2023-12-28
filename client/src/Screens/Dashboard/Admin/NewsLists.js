import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { TbPlayerTrackNext, TbPlayerTrackPrev } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';
import { Empty } from '../../../Components/Notfications/Empty';
import Loader from '../../../Components/Notfications/Loader';
import Table from '../../../Components/TableNews';
import {
  deleteAllMoviesAction,
  deleteMovieAction,
  getAllNewsAction,
} from '../../../Redux/Actions/NewsActions';
import SideBar from '../SideBar';

function MoviesList() {
  const dispatch = useDispatch();
  const sameClass = 'text-white p-2 rounded font-semibold border-2 border-subMain hover:bg-subMain';
  const { isLoading, isError, movies, pages, page } = useSelector((state) => state.getAllNews);
  const { isLoading: deleteLoading, isError: deleteError } = useSelector(
    (state) => state.deleteMovie,
  );
  const { isLoading: allLoading, isError: allError } = useSelector(
    (state) => state.deleteAllMovies,
  );

  const deleteMovieHandler = (id) => {
    window.confirm('Ви дійсно хочете видалити цю новину?') && dispatch(deleteMovieAction(id));
  };

  const deleteAllMoviesHandler = () => {
    window.confirm('Ви впевнені, що хочете видалити всі новини?') &&
      dispatch(deleteAllMoviesAction());
  };

  useEffect(() => {
    //dispatch(getAllNewsAction({}));
    if (isError || deleteError || allError) {
      toast.error(isError || deleteError || allError);
    }
  }, [dispatch, isError, deleteError, allError]);

  const nextPage = () => {
    dispatch(
      getAllNewsAction({
        pageNumber: page + 1,
      }),
    );
  };
  const prevPage = () => {
    dispatch(
      getAllNewsAction({
        pageNumber: page - 1,
      }),
    );
  };

  return (
    <SideBar>
      <div className="flex flex-col gap-6">
        <div className="flex-btn gap-2">
          <h2 className="text-xl font-bold">Список новин</h2>
          {movies?.length > 0 && (
            <button
              disabled={allLoading}
              onClick={deleteAllMoviesHandler}
              className="bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded">
              {allLoading ? 'Видалення...' : 'Видалити все'}
            </button>
          )}
        </div>
        {isLoading || deleteLoading ? (
          <Loader />
        ) : movies?.length > 0 ? (
          <>
            <Table data={movies} admin={true} onDeleteHandler={deleteMovieHandler} />
            <div className="w-full flex-rows gap-6 my-5">
              <button onClick={prevPage} disabled={page === 1} className={sameClass}>
                <TbPlayerTrackPrev className="text-xl" />
              </button>
              <button onClick={nextPage} disabled={page === pages} className={sameClass}>
                <TbPlayerTrackNext className="text-xl" />
              </button>
            </div>
          </>
        ) : (
          <Empty message="У вас немає новин" />
        )}
      </div>
    </SideBar>
  );
}

export default MoviesList;

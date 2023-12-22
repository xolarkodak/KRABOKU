import React, { useEffect } from 'react';
import { FaRegListAlt, FaUser } from 'react-icons/fa';
import SideBar from '../SideBar';
import { HiViewGridAdd } from 'react-icons/hi';
import Table from '../../../Components/Table';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsersAction } from '../../../Redux/Actions/userActions';
import toast from 'react-hot-toast';
import { Empty } from '../../../Components/Notfications/Empty';
import Loader from '../../../Components/Notfications/Loader';
import { deleteMovieAction } from '../../../Redux/Actions/MoviesActions';

function Dashboard() {
  const dispatch = useDispatch();
  const {
    isLoading: catLoading,
    isError: catError,
    categories,
  } = useSelector((state) => state.categoryGetAll);
  const {
    isLoading: userLoading,
    isError: userError,
    users,
  } = useSelector((state) => state.adminGetAllUsers);
  const { isLoading, isError, movies, totalMovies } = useSelector((state) => state.getAllMovies);
  const { isLoading: deleteLoading, isError: deleteError } = useSelector(
    (state) => state.deleteMovie,
  );

  const deleteMovieHandler = (id) => {
    window.confirm('Ви дійсно хочете видалити цей фільм?') && dispatch(deleteMovieAction(id));
  };

  useEffect(() => {
    dispatch(getAllUsersAction());
    if (isError || catError || userError || deleteError) {
      toast.error('Щось пішло не так!');
    }
  }, [dispatch, isError, catError, userError, deleteError]);

  const DashboardData = [
    {
      bg: 'bg-orange-600',
      icon: FaRegListAlt,
      title: 'Всього фільмів',
      total: isLoading ? 'Завантаження...' : totalMovies || 0,
    },
    {
      bg: 'bg-blue-700',
      icon: HiViewGridAdd,
      title: 'Всього категорій',
      total: catLoading ? 'Завантаження...' : categories?.length || 0,
    },
    {
      bg: 'bg-green-600',
      icon: FaUser,
      title: 'Всього користувачів',
      total: userLoading ? 'Завантаження...' : users?.length || 0,
    },
  ];
  return (
    <SideBar>
      <h2 className="text-xl font-bold">Приладова панель</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {DashboardData.map((data, index) => (
          <div key={index} className="p-4 rounded bg-main border-border grid grid-cols-4 gap-2">
            <div className={`col-span-1 rounded-full h-12 w-12 flex-colo ${data.bg}`}>
              <data.icon />
            </div>
            <div className="col-span-3">
              <h2>{data.title}</h2>
              <p className=" mt-2 font-bold">{data.total}</p>
            </div>
          </div>
        ))}
      </div>
      <h3 className="text-md font-medium my-6 text-border">Останні фільми</h3>
      {isLoading || deleteLoading ? (
        <Loader />
      ) : movies.length > 0 ? (
        <Table data={movies?.slice(0, 5)} admin={true} onDeleteHandler={deleteMovieHandler} />
      ) : (
        <Empty message="Пусто" />
      )}
    </SideBar>
  );
}

export default Dashboard;

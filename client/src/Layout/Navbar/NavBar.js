import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaSearch, FaHeart } from 'react-icons/fa';
import { CgUser } from 'react-icons/cg';
import { useSelector } from 'react-redux';

function NavBar() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.userLogin);
  const { likedMovies } = useSelector((state) => state.userGetFavoriteMovies);
  const hover = 'hover:text-subMain transitions text-white';
  const Hover = ({ isActive }) => (isActive ? 'text-subMain' : hover);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/movies/${search}`);
      setSearch(search);
    } else {
      navigate(`/movies`);
    }
  };

  return (
    <>
      <div className="bg-main shadow-md sticky top-0 z-20">
        <div className="container mx-auto py-6 px-2 lg:grid gap-10 grid-cols-7 justify-between items-center">
          <div className="col-span-1 lg:block hidden">
            <Link to="/">
              <img src="/images/logo.png" alt="logo" className="w-full h-12 object-contain" />
            </Link>
          </div>
          <div className="col-span-3">
            <form
              onSubmit={handleSearch}
              className="w-full text-sm bg-dryGray rounded flex-btn gap-4">
              <button type="submit" className="bg-subMain w-12 flex-colo h-12 rounded text-white">
                <FaSearch className='w-5 h-5'/>
              </button>
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Знайти фільм"
                className="font-medium placeholder:text-border text-[18px] w-11/12 h-12 bg-transparent border-none px-2 text-black"
              />
            </form>
          </div>

          <div className="col-span-3 font-medium text-[16px] hidden xl:gap-14 2xl:gap-12 justify-between lg:flex xl:justify-end items-center">
            <NavLink to="/movies" className={Hover}>
              Фільми
            </NavLink>
            <NavLink to="/news" className={Hover}>
              Новини
            </NavLink>
            <NavLink to="/about-us" className={Hover}>
              Про нас
            </NavLink>
            <NavLink to="/contact-us" className={Hover}>
              Зв'яжіться з нами
            </NavLink>
            <NavLink
              to={userInfo?.isAdmin ? '/dashboard' : userInfo ? '/profile' : '/login'}
              className={Hover}>
              {userInfo ? (
                <img
                  src={userInfo?.image ? userInfo?.image : '/images/user.jpg'}
                  alt={userInfo?.fullName}
                  className="w-10 h-10 rounded-full border object-cover border-subMain"
                />
              ) : (
                <CgUser className="w-10 h-10" />
              )}
            </NavLink>
            <NavLink to="/favorites" className={`${Hover} relative`}>
              <FaHeart className="w-7 h-7" />
              <div className="w-5 h-5 flex-colo rounded-full text-xs bg-subMain text-white absolute -top-5 -right-1">
                {likedMovies?.length || 0}
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBar;

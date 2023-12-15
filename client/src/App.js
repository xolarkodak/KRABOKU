import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Aos from 'aos';

import HomeScreen from './Screens/HomeScreen';
import AboutUs from './Screens/AboutUs';
import ContactUs from './Screens/ContactUs';
import MoviesPage from './Screens/Movies';
import NotFound from './Screens/NotFound';
import SingleMovie from './Screens/SingleMovie';
import WatchPage from './Screens/WatchPage';
import Login from './Screens/Login';
import Register from './Screens/Register';
import Profile from './Screens/Dashboard/Profile';
import Password from './Screens/Dashboard/Password';
import FavoritesMovies from './Screens/Dashboard/FavoritesMovies';

function App() {
  Aos.init();
  return (
    <>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movie/:id" element={<SingleMovie />} />
        <Route path="/watch/:id" element={<WatchPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/password" element={<Password />} />
        <Route path="/favorites" element={<FavoritesMovies />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;

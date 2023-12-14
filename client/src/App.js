import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import HomeScreen from "./Screens/HomeScreen";
import AboutUs from "./Screens/AboutUs";
import ContactUs from "./Screens/ContactUs";
import MoviesPage from "./Screens/Movies";
import NotFound from "./Screens/NotFound";

function App() {
  return(<>
    <Routes>
    <Route path="/" element={<HomeScreen />} />
    <Route path="/about-us" element={<AboutUs />} />
    <Route path="/contact-us" element={<ContactUs />} />
    <Route path="/movies" element={<MoviesPage />} />
    {/* <Route path="/movies/:search" element={<MoviesPage />} />
    <Route path="/movie/:id" element={<SingleMovie />} />
    <Route path="/watch/:id" element={<WatchPage />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} /> */}
    <Route path="*" element={<NotFound />} />
  </Routes>
  </>
    );
}

export default App;

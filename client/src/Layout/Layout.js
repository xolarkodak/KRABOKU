import React from "react";
import Footer from "./Footer/Footer";
import MobileFooter from "./Footer/MobileFooter";
import NavBar from "./Navbar/NavBar";

function Layout({ children }) {
  return (
    <>
      <div className="bg-main text-white">
        <NavBar />
        {children}
        <Footer />
        <MobileFooter />
      </div>
    </>
  );
}

export default Layout;

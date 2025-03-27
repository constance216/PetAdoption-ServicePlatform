import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
// import "../styles/Layout.css";

const Layout = () => {
  return (
    <div className="layout">
      <Navbar />
      <Outlet/>
      <Footer />
    </div>
  );
};

export default Layout;
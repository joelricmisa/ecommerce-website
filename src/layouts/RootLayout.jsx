import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import { ScrollToTop } from "../components";

const RootLayout = () => {
  return (
    <div className="relative overflow-clip font-poppins text-base">
      <ScrollToTop />
      <Navbar />
      <main>{<Outlet />}</main>
      <Footer />
    </div>
  );
};

export default RootLayout;

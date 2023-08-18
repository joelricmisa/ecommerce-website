import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

const RootLayout = () => {
	return (
		<div className="overflow-hidden">
			<Navbar />
			<main>{<Outlet />}</main>
			<Footer />
		</div>
	);
};

export default RootLayout;

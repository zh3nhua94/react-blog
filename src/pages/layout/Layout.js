import React from "react";
import { Outlet } from "react-router-dom";
import TopBar from "../../components/topbar/TopBar";
import Footer from "../../components/footer/Footer";
import "./layout.css";

const Layout = () => {
	return (
		<div className="App">
			<TopBar />
			<div className="outlet">
				<Outlet />
			</div>
			<Footer />
		</div>
	);
};

export default Layout;

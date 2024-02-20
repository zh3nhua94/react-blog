import React, { useEffect, useState } from "react";
import "./sidebar.css";
import axios from "axios";
import { HashLink } from "react-router-hash-link";

const SideBar = () => {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const [cats, setCats] = useState([]);

	useEffect(() => {
		const getCats = async () => {
			const res = await axios.get(process.env.REACT_APP_API_URL + "/categories");
			const data = res.data;
			setCats(data);
		};
		getCats();
	}, []);
	return (
		<div className="sideBar">
			<div className="sideBarItem">
				<span className="sideBarTitle">ABOUT US</span>
				<img
					src={PF + "about.jpeg"}
					alt=""
					className="sideBarImg"
				/>
				<p className="sideBarText">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
					magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
					commodo.
				</p>
			</div>
			<div className="sideBarItem">
				<span className="sideBarTitle">CATEGORIES</span>
				<ul className="sideBarList">
					{cats?.map((c) => (
						<li
							className="sideBarListItem"
							key={c._id}
						>
							<HashLink to={`/?cat=${c.name}#home`}>{c.name}</HashLink>
						</li>
					))}
				</ul>
			</div>
			<div className="sideBarItem">
				<span className="sideBarTitle">FOLLOW US</span>
				<div className="sideBarSocial">
					<i className="sideBarIcon fa-brands fa-square-facebook"></i>
					<i className="sideBarIcon fa-brands fa-square-instagram"></i>
					<i className="sideBarIcon fa-brands fa-square-twitter"></i>
					<i className="sideBarIcon fa-brands fa-square-facebook"></i>
				</div>
			</div>
		</div>
	);
};

export default SideBar;

import React from "react";
import "./topbar.css";
import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../context/Context";
import { useState } from "react";

const TopBar = () => {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const { user, dispatch } = useContext(Context);
	const [showNavbar, setShowNavbar] = useState(false);

	const handleLogout = () => {
		dispatch({ type: "LOGOUT" });
		window.location.replace("/login");
	};

	const handleShowNavbar = (e) => {
		e.stopPropagation();
		//Check if Navbar just opened
		if (!showNavbar) {
			//Help to trigger close when click outside mobile nav
			document.addEventListener("click", handleOutsideClick);
		}
		setShowNavbar(!showNavbar);
	};

	const handleOutsideClick = () => {
		setShowNavbar(false);
		document.removeEventListener("click", handleOutsideClick);
	};

	return (
		<div className="topBar">
			<div className="topLeft">
				<i
					className="topIcon fa-brands fa-square-facebook"
					aria-label="Facebook"
				></i>
				<i
					className="topIcon fa-brands fa-square-instagram"
					aria-label="Instagram"
				></i>
				<i
					className="topIcon fa-brands fa-square-twitter"
					aria-label="Twitter"
				></i>
				<i
					className="topIcon fa-brands fa-square-pinterest"
					aria-label="Pinterest"
				></i>
			</div>
			<div
				className={`topCenter  ${showNavbar && "active"}`}
				data-testid="topCenter"
			>
				<ul className="topList">
					<li className="topListItem">
						<NavLink to="/">HOME</NavLink>
					</li>
					<li className="topListItem">
						<NavLink to="/about">ABOUT</NavLink>
					</li>
					<li className="topListItem">
						<NavLink to="/contact">CONTACT</NavLink>
					</li>
					<li className="topListItem">
						<NavLink to="/write">WRITE</NavLink>
					</li>
					{!user && showNavbar && (
						<>
							<li className="topListItem">
								<Link to="/login">LOGIN</Link>
							</li>
							<li className="topListItem">
								<Link to="/register">REGISTER</Link>
							</li>
						</>
					)}
				</ul>
			</div>
			<div className="topRight">
				{user ? (
					<>
						<ul className="topList">
							<li className="topListItem">
								{user && (
									<Link
										onClick={handleLogout}
										className="logout"
										to="/"
									>
										LOGOUT
									</Link>
								)}
							</li>
						</ul>
						<Link to="/settings">
							<img
								src={user.profilePic ? PF + user.profilePic : "/assets/noAvatar.png"}
								alt=""
								className="topImg"
							/>
						</Link>
					</>
				) : (
					<ul className="topList loginNav">
						<li className="topListItem">
							<Link to="/login">LOGIN</Link>
						</li>
						<li className="topListItem">
							<Link to="/register">REGISTER</Link>
						</li>
					</ul>
				)}
				<i className="topSearchIcon fa-solid fa-magnifying-glass"></i>
				<div
					className="menu-icon"
					onClick={handleShowNavbar}
					aria-label="Menu Icon"
				>
					<i className="fa-solid fa-bars"></i>
				</div>
			</div>
		</div>
	);
};

export default TopBar;

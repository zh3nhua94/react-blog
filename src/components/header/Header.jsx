import "./header.css";
import React from "react";

const Header = () => {
	return (
		<div className="header">
			<div className="headerTitles">
				<span className="headerTitleSm">Trends & Stories</span>
				<span className="headerTitleLg">Flow Club</span>
			</div>
			<img
				src="/assets/sea.jpg"
				alt=""
				className="headerImg"
			/>
		</div>
	);
};

export default Header;

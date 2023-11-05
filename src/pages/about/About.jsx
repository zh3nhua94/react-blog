import React from "react";
import "./about.css";

const About = () => {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	return (
		<div className="about">
			<h1>About Us</h1>
			<div className="aboutWrapper">
				<div className="aboutImg">
					<img
						src={PF + "about.jpeg"}
						alt=""
					/>
				</div>
				<div className="aboutDesc">
					<div className="aboutDescText">
						<p>
							Delving deeply into music, travel, lifestyle and culture, we promote quality of life and connects a global
							community of creative professionals from London to Tokyo.
						</p>
						<p>
							In 2023, we have become a leading lifestyle authority with a dynamic mix of print and online media,
							including a quarterly magazine sold in over 100 countries in four languages and bestselling books.
						</p>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
							dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
							ea commodo.
						</p>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
							dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
							ea commodo.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default About;

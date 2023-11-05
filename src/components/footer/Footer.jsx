import React from "react";
import "./footer.css";

const Footer = () => {
	const d = new Date();
	const year = d.getFullYear();
	return (
		<div className="footer">
			<hr />
			<p>&copy; React & Note Blog {year}</p>
			<p>Website design & development by Zen</p>
		</div>
	);
};

export default Footer;

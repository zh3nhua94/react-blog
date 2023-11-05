import React from "react";
import "./contact.css";

const Contact = () => {
	return (
		<div className="contact">
			<h1>Contact Us</h1>
			<div className="contactWrapper">
				<div className="contactLeft">
					<h2>Offices</h2>
				</div>
				<div className="contactRight">
					<div className="contactInnerDiv">
						<h3>DENMARK – HEAD OFFICE</h3>
						<p>Email: info@blabla.com</p>
					</div>
					<div className="contactInnerDiv">
						<h3>JAPAN – BRANCH OFFICE</h3>
						<p>Email: info@blabla.com</p>
					</div>
				</div>
			</div>
			<div className="contactWrapper">
				<div className="contactLeft">
					<h2>Contact</h2>
				</div>
				<div className="contactRight">
					<div className="contactInnerDiv">
						<h3>GENERAL</h3>
						<p>
							For all customer service questions or comments, sales and distribution enquiries please email
							info@blabla.com
						</p>
					</div>
					<div className="contactInnerDiv">
						<h3>ADVERTISING</h3>
						<p>For advertisement inquiries, please get in touch at advertising@blabla.com</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Contact;

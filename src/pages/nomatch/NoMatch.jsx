import React from "react";
import "./nomatch.css";
import { Link } from "react-router-dom";

const NoMatch = () => {
	return (
		<>
			<section className="page_404">
				<div className="container">
					<div className="row">
						<div className="wrapper404 col-sm-10 col-sm-offset-1  text-center">
							<div className="four_zero_four_bg">
								<h1 className="text-center ">Page Not Found</h1>

								<div className="tipsiz">
									<div className="tipsiz-body">
										<div className="left-arm arm"></div>
										<div className="face">
											<div className="upper-face">
												<div className="element">4</div>
												<div className="element">0</div>
												<div className="element">4</div>
											</div>
											<div className="mouth"></div>
										</div>
										<div className="right-arm arm"></div>
									</div>
								</div>
							</div>

							<div className="contant_box_404">
								<h3 className="h2">Look like you're lost?</h3>

								{/* <p>the page you are looking for not avaible!</p> */}

								<Link
									to="/"
									className="link_404"
								>
									Go to Home
								</Link>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default NoMatch;

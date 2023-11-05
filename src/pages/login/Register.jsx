import React, { useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [displayName, setDisplayName] = useState("");
	const [error, setError] = useState(false);
	const navigate = useNavigate("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(false);
		try {
			const res = await axios.post(process.env.REACT_APP_API_URL + "/auth/signup", {
				username,
				email,
				password,
				displayName,
			});
			res.data && navigate("/login");
		} catch (error) {
			console.log(error);
			setError(true);
		}
	};

	return (
		<div
			className="login"
			onSubmit={handleSubmit}
		>
			<form className="loginForm">
				<h1 className="loginTitle">Register</h1>
				<label>Username</label>
				<input
					type="text"
					className="loginInput"
					onChange={(e) => setUsername(e.target.value)}
					minLength="8"
				/>
				<label>Display Name</label>
				<input
					type="text"
					className="loginInput"
					onChange={(e) => setDisplayName(e.target.value)}
				/>
				<label>Email Address</label>
				<input
					type="email"
					className="loginInput"
					onChange={(e) => setEmail(e.target.value)}
				/>
				<label>Password</label>
				<input
					type="password"
					className="loginInput"
					onChange={(e) => setPassword(e.target.value)}
					minLength="8"
				/>
				<button
					className="loginButton"
					type="submit"
				>
					Create Account
				</button>
				<span className={error ? "registerWrong show" : "registerWrong"}>Username or Email already taken.</span>
			</form>
			<span className="loginRegisterText">
				Already have an account?{" "}
				<Link
					to="/login"
					className="loginRegisterLink"
				>
					Log In
				</Link>
			</span>
		</div>
	);
};

export default Register;

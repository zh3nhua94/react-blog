import React, { useContext, useRef } from "react";
import "./login.css";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import axios from "axios";

const Login = () => {
	const userRef = useRef();
	const passwordRef = useRef();
	const { dispatch, isFetching } = useContext(Context);

	const handleSubmit = async (e) => {
		e.preventDefault();
		dispatch({ type: "LOGIN_START" });
		try {
			const res = await axios.post(process.env.REACT_APP_API_URL + "/auth/login", {
				email: userRef.current.value,
				password: passwordRef.current.value,
			});
			dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
		} catch (error) {
			dispatch({ type: "LOGIN_FAILURE" });
			console.log(error);
		}
	};

	return (
		<div className="login">
			<form
				className="loginForm"
				onSubmit={handleSubmit}
			>
				<h1 className="loginTitle">Log in to Account</h1>
				<label>Email Address</label>
				<input
					type="email"
					className="loginInput"
					ref={userRef}
				/>
				<label>Password</label>
				<input
					type="password"
					className="loginInput"
					ref={passwordRef}
				/>
				<button
					disabled={isFetching}
					className="loginButton"
					type="submit"
				>
					Login
				</button>
			</form>
			<span className="loginRegisterText">
				Don't have an account?{" "}
				<Link
					to="/register"
					className="loginRegisterLink"
				>
					Sign Up
				</Link>
			</span>
		</div>
	);
};

export default Login;

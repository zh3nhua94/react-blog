import React, { useContext, useState } from "react";
import "./settings.css";
import SideBar from "../../components/sidebar/SideBar";
import { Context } from "../../context/Context";
import axios from "axios";

const Settings = () => {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const { user, dispatch } = useContext(Context);
	const [file, setFile] = useState(null);
	const [username, setUsername] = useState(user.username);
	const [password, setPassword] = useState(""); //login does not return password details to Context.Provider
	const [email, setEmail] = useState(user.email);
	const [displayName, setDisplayName] = useState(user.displayName);
	const [profilePic, setProfilePic] = useState(user.profilePic);
	const [updated, setUpdated] = useState(false);

	const handleUpdate = async (e) => {
		e.preventDefault();
		setUpdated(false);
		const updatedUser = {
			userId: user._id,
			username,
			displayName,
			email,
			password,
		};
		if (file) {
			const data = new FormData();
			const filename = Date.now() + file.name;
			//for some reason need to append filename first then only file, if not will get error
			data.append("name", filename);
			data.append("file", file);
			updatedUser.profilePic = filename;
			try {
				await axios.post(process.env.REACT_APP_API_URL + "/upload", data);
			} catch (error) {
				console.log(error);
			}
		}
		try {
			await axios.put(process.env.REACT_APP_API_URL + "/users/" + user._id, updatedUser);
			//relogin using dispatch to change context currentUser logged in details and also change localStorage login details
			try {
				const res = await axios.post(process.env.REACT_APP_API_URL + "/auth/login", {
					email: email,
					password: password,
				});
				dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
			} catch (error) {
				console.log(error);
			}

			// window.scrollTo(0, 0);
			setUpdated(true);
			// console.log(updated);
		} catch (error) {}
	};

	const handleImage = (e) => {
		setFile(e.target.files[0]);
		setProfilePic();
	};

	return (
		<div className="settings">
			<div className="settingsWrapper">
				<div className="settingsTitle">
					<span className="settingsUpdateTitle">Update Your Account</span>
					<span className="settingsDeleteTitle">Delete Account</span>
				</div>
				<form
					action=""
					className="settingsForm"
					onSubmit={handleUpdate}
				>
					<label>Profile Picture</label>
					<div className="settingsProfilePic">
						<label
							htmlFor="fileInput"
							className="settingsImgLabel"
						>
							<img
								src={file ? URL.createObjectURL(file) : profilePic ? PF + profilePic : "/assets/noAvatar.png"}
								alt=""
							/>
							<i className="settingsProfilePicIcon fa-regular fa-circle-user"></i>
						</label>
						<input
							type="file"
							id="fileInput"
							style={{ display: "none" }}
							onChange={handleImage}
						/>
					</div>
					<label htmlFor="PPusername">Username</label>
					<input
						type="text"
						value={username}
						id="PPusername"
						minLength="8"
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
					<label htmlFor="PPDisplayName">Display Name</label>
					<input
						type="text"
						value={displayName}
						id="PPDisplayName"
						onChange={(e) => setDisplayName(e.target.value)}
						required
					/>
					<label htmlFor="PPemail">Email</label>
					<input
						type="email"
						value={email}
						id="PPemail"
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
					<label htmlFor="PPpassword">Password</label>
					<input
						type="password"
						value={password}
						id="PPpassword"
						minLength="8"
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
					<button
						className="settingsSubmit"
						type="submit"
					>
						Update
					</button>
				</form>
				<div
					id="updatedNotice"
					className={updated ? "updateShow" : ""}
				>
					Your account has been updated successfully.
				</div>
			</div>
			<SideBar />
		</div>
	);
};

export default Settings;

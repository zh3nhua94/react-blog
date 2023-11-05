import React, { useContext, useEffect, useState } from "react";
import "./singlePost.css";
import "../../pages/Write/write.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import dateFormat from "dateformat";
import { HashLink } from "react-router-hash-link";
import { Context } from "../../context/Context";

const SinglePost = () => {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const location = useLocation();
	const pathPostId = location.pathname.split("/")[2];
	const [post, setPost] = useState({});
	const [user, setUser] = useState({});
	const { user: currentUser } = useContext(Context);
	const [title, setTitle] = useState("");
	const [desc, setDesc] = useState("");
	const [file, setFile] = useState(null);
	const [updateMode, setUpdateMode] = useState(false);
	useEffect(() => {
		const getPost = async () => {
			try {
				const res = await axios.get(process.env.REACT_APP_API_URL + "/posts/" + pathPostId);
				setPost(res.data);
				setTitle(res.data.title);
				setDesc(res.data.desc);
				const userData = await axios.get(process.env.REACT_APP_API_URL + "/users?username=" + res.data.username);
				setUser(userData.data);
			} catch (error) {
				console.log(error);
			}
		};
		getPost();
	}, [pathPostId]);

	const handleDelete = async () => {
		try {
			await axios.delete(process.env.REACT_APP_API_URL + "/posts/" + pathPostId, {
				data: { username: currentUser.username }, //for delete(), unlike post, need to add "data:" only can send req.body
			});
			window.location.replace("/");
		} catch (error) {
			console.log(error);
		}
	};

	const handleUpdate = async (e) => {
		e.preventDefault();
		//put all post info inside an object
		const newPost = {
			username: currentUser.username,
			title,
			desc,
		};
		if (file) {
			const data = new FormData();
			const filename = Date.now() + file.name;
			//for some reason need to append filename first then only file, if not will get error
			data.append("name", filename);
			data.append("file", file);
			newPost.photo = filename;
			try {
				await axios.post(process.env.REACT_APP_API_URL + "/upload", data);
			} catch (error) {
				console.log(error);
			}
		}
		try {
			await axios.put(process.env.REACT_APP_API_URL + "/posts/" + pathPostId, newPost);
			setUpdateMode(false);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="singlePost">
			<div className="singlePostWrapper">
				{post.photo && !file && (
					<img
						src={PF + post.photo}
						alt=""
						className="singlePostImg"
					/>
				)}
				{file && (
					<img
						src={URL.createObjectURL(file)}
						alt=""
						className="singlePostImg"
					/>
				)}
				{!updateMode ? (
					<>
						<div className="singlePostTitle">
							<h1>{title}</h1>
							{currentUser && post.username === currentUser.username && (
								<div className="singlePostEdit">
									<i
										className="singlePostTitleEdit singlePostIcon fa-solid fa-pen-to-square"
										onClick={() => setUpdateMode(true)}
									></i>
									<i
										className="singlePostTitleDelete singlePostIcon fa-solid fa-trash"
										onClick={handleDelete}
									></i>
								</div>
							)}
						</div>
						<div className="singlePostInfo">
							<div className="singlePostAuthor">
								<HashLink
									to={`/?user=${post.username}#home`}
									className="authorImgLink"
								>
									<img
										src={user.profilePic ? PF + user.profilePic : "/assets/noAvatar.png"}
										alt=""
										className="topImg"
									/>
								</HashLink>
								Author:&nbsp;
								<HashLink to={`/?user=${post.username}#home`}>
									<strong>{user.displayName}</strong>
								</HashLink>
							</div>
							<span className="singlePostDate">{dateFormat(post.createdAt, "mmmm dd, yyyy")}</span>
						</div>
						<p
							className="singlePostDesc"
							style={{ whiteSpace: "pre-wrap" }}
						>
							{desc}
						</p>
					</>
				) : (
					<form
						className="writeForm"
						// onSubmit={handleSubmit}
					>
						<div className="writeFormGroup">
							<label htmlFor="fileInput">
								<i className="writeIcon fa-solid fa-plus"></i>
							</label>
							<input
								type="file"
								id="fileInput"
								style={{ display: "none" }}
								onChange={(e) => setFile(e.target.files[0])}
							/>
							<input
								type="text"
								placeholder="Title"
								className="writeInput writeTitle"
								autoFocus //focus on this input when page reload
								onChange={(e) => setTitle(e.target.value)}
								value={title}
							/>
						</div>
						<div className="writeFormGroup">
							<textarea
								placeholder="Tell your story..."
								className="writeInput writeText"
								onChange={(e) => setDesc(e.target.value)}
								value={desc}
							></textarea>
						</div>
						<button
							className="writeSubmit"
							type="submit"
							onClick={handleUpdate}
						>
							Update
						</button>
					</form>
				)}
			</div>
		</div>
	);
};

export default SinglePost;

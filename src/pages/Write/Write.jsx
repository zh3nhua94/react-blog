import React, { useContext, useState } from "react";
import "./write.css";
import axios from "axios";
import { Context } from "../../context/Context";
import Select from "react-select";
import { dataOptions } from "../../data/categories";

const Write = () => {
	const [title, setTitle] = useState("");
	const [desc, setDesc] = useState("");
	const [file, setFile] = useState(null);
	const [cat, setCat] = useState([]);
	const { user } = useContext(Context);

	const handleSubmit = async (e) => {
		e.preventDefault();
		//put categories into an array
		const catList = [];
		cat.forEach((c) => catList.push(c.value));
		//put all post info inside an object
		const newPost = {
			username: user.username,
			title,
			desc,
			categories: catList,
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
			//submit Post to database
			const res = await axios.post(process.env.REACT_APP_API_URL + "/posts", newPost);
			window.location.replace("/post/" + res.data._id);
		} catch (error) {}
	};

	const handleCat = (options) => {
		setCat(options);
	};

	return (
		<div className="write">
			{file && (
				<img
					src={URL.createObjectURL(file)}
					alt=""
					className="writeImg"
				/>
			)}
			<form
				className="writeForm"
				onSubmit={handleSubmit}
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
					/>
				</div>
				<Select
					defaultValue=""
					isMulti
					name="colors"
					options={dataOptions}
					className="basic-multi-select writeSelectCat"
					classNamePrefix="select"
					placeholder="Select Categories"
					styles={{
						control: (baseStyles, state) => ({
							...baseStyles,
							boxShadow: state.isFocused ? "none" : "none",
							borderColor: state.isFocused ? "teal" : "hsl(0, 0%, 80%)",
							"&:hover": {
								boxShadow: "none",
								outline: "none",
								borderColor: "hsl(0, 0%, 80%)",
							},
						}),
					}}
					value={cat}
					onChange={handleCat}
				/>
				<div className="writeFormGroup">
					<textarea
						placeholder="Tell your story..."
						className="writeInput writeText"
						style={{ whiteSpace: "pre-wrap" }}
						onChange={(e) => setDesc(e.target.value)}
					></textarea>
				</div>
				<button
					className="writeSubmit"
					type="submit"
				>
					Publish
				</button>
			</form>
		</div>
	);
};

export default Write;

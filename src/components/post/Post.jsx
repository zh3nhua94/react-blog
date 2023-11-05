import React from "react";
import "./post.css";
import dateFormat from "dateformat";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

const Post = ({ post }) => {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	return (
		<div className="post">
			{post.photo && (
				<Link to={`/post/${post._id}`}>
					<img
						src={PF + post.photo}
						alt=""
						className="postImg"
					/>
				</Link>
			)}

			<div className="postInfo">
				<div className="postCats">
					{post.categories.map((c) => (
						<HashLink
							key={c}
							to={`/?cat=${c}#home`}
						>
							<span className="postCat">{c}</span>
						</HashLink>
					))}
				</div>
				<Link to={`/post/${post._id}`}>
					<h2 className="postTitle">{post.title}</h2>
				</Link>
			</div>
			<p className="postDesc">{post.desc}</p>
			<p className="postDate">{dateFormat(post.createdAt, "mmmm dd, yyyy")}</p>
		</div>
	);
};

export default Post;

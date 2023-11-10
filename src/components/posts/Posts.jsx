import React from "react";
import "./posts.css";
import Post from "../post/Post";
import { useState } from "react";
import { useEffect } from "react";
import LoadingCircle from "../loadingCircle/LoadingCircle";

const Posts = ({ posts }) => {
	const [visibleData, setVisibleData] = useState(6);
	const [showBtn, setShowBtn] = useState(true);

	useEffect(() => {
		visibleData >= posts.length ? setShowBtn(false) : setShowBtn(true);
	}, [visibleData, posts.length]);

	const handleShowMore = () => {
		setVisibleData((prev) => prev + 4);
	};

	return (
		<div className="posts">
			{posts.length ? (
				<>
					{posts.slice(0, visibleData).map((p) => (
						<Post
							key={p._id}
							post={p}
						/>
					))}
					<div className="showMoreBtn">
						<button
							onClick={handleShowMore}
							className={showBtn ? "" : "hideLoadMore"}
						>
							Load More{" "}
						</button>
					</div>
				</>
			) : (
				// Loading spinner
				<LoadingCircle />
			)}
		</div>
	);
};

export default Posts;

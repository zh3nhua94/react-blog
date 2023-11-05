import React, { useEffect, useState } from "react";
import "./home.css";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import SideBar from "../../components/sidebar/SideBar";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Home = () => {
	const [posts, setPosts] = useState([]);
	const { search } = useLocation(); //gets any query if exists

	useEffect(() => {
		const fetchPosts = async () => {
			const res = await axios.get(process.env.REACT_APP_API_URL + "/posts" + search);
			setPosts(
				res.data.sort((post1, post2) => {
					return new Date(post2.createdAt) - new Date(post1.createdAt);
				})
			);
		};
		fetchPosts();
	}, [search]);

	return (
		<>
			<Header />
			<div className="home">
				<div
					className="anchor"
					id="home"
				></div>
				<Posts posts={posts} />
				<SideBar />
			</div>
		</>
	);
};

export default Home;

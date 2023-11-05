import Layout from "./pages/layout/Layout";
import Write from "./pages/Write/Write";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import NoMatch from "./pages/nomatch/NoMatch";
import Register from "./pages/login/Register";
import Settings from "./pages/settings/Settings";
import Single from "./pages/single/Single";
import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/scrollToTop/ScrollToTop";
import { useContext } from "react";
import { Context } from "./context/Context";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";

function App() {
	const { user } = useContext(Context);

	return (
		<>
			<ScrollToTop />
			<Routes>
				<Route
					path="/"
					element={<Layout />}
				>
					<Route
						index
						element={<Home />}
					/>
					<Route
						path="login"
						element={user ? <Home /> : <Login />}
					/>
					<Route
						path="register"
						element={user ? <Home /> : <Register />}
					/>
					<Route
						path="write"
						element={user ? <Write /> : <Login />}
					/>
					<Route
						path="settings"
						element={user ? <Settings /> : <Login />}
					/>
					<Route
						path="post/:postId"
						element={<Single />}
					/>
					<Route
						path="about"
						element={<About />}
					/>
					<Route
						path="contact"
						element={<Contact />}
					/>
					<Route
						path="*"
						element={<NoMatch />}
					/>
				</Route>
			</Routes>
		</>
	);
}

export default App;

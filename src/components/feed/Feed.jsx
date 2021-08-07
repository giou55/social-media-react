import { useState, useEffect } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import axios from "axios";
// import { useContext } from "react";
// import { AuthContext } from "../../context/AuthContext";
import { useSelector } from "react-redux";

export default function Feed({ profile }) {
	const [posts, setPosts] = useState([]);
	// const { user } = useContext(AuthContext);

	const user = useSelector((state) => state.user);

	useEffect(() => {
		const fetchPosts = async () => {
			const res = profile
				? await axios.get("/posts/profile/" + profile._id)
				: await axios.get("/posts/timeline/" + user._id);
			setPosts(
				res.data.sort((p1, p2) => {
					return new Date(p2.createdAt) - new Date(p1.createdAt);
				})
			);
		};
		fetchPosts();
	}, [profile, user]);

	return (
		<div className="feed">
			<div className="feedWrapper">
				{(!profile || profile._id === user._id) && <Share user={user} />}
				{posts && posts.length > 0 ? "" : "No Posts"}
				{posts.map((p) => (
					<Post key={p._id} p={p} />
				))}
			</div>
		</div>
	);
}

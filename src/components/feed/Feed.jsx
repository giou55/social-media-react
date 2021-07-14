import { useState, useEffect } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Feed({ userId }) {
	const [posts, setPosts] = useState([]);
	const { user } = useContext(AuthContext);

	useEffect(() => {
		const fetchPosts = async () => {
			const res = userId
				? await axios.get("/posts/profile/" + userId)
				: await axios.get("/posts/timeline/" + user._id);
			setPosts(
				res.data.sort((p1, p2) => {
					return new Date(p2.createdAt) - new Date(p1.createdAt);
				})
			);
		};
		fetchPosts();
	}, [userId, user._id]);

	return (
		<div className="feed">
			<div className="feedWrapper">
				{(!userId || userId === user._id) && <Share />}
				{posts && posts.length > 0 ? "" : "No Posts"}
				{posts.map((p) => (
					<Post key={p._id} p={p} />
				))}
			</div>
		</div>
	);
}

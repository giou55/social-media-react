import { useState, useEffect } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Feed({ fullname }) {
	const [posts, setPosts] = useState([]);
	const { user } = useContext(AuthContext);

	useEffect(() => {
		const fetchPosts = async () => {
			const res = fullname
				? await axios.get("/posts/profile/" + user._id)
				: await axios.get("/posts/timeline/" + user._id);
			setPosts(
				res.data.sort((p1, p2) => {
					return new Date(p2.createdAt) - new Date(p1.createdAt);
				})
			);
		};
		fetchPosts();
	}, [fullname, user]);

	return (
		<div className="feed">
			<div className="feedWrapper">
				{user && <Share user={user} />}
				{posts && posts.length > 0 ? "" : "No Posts"}
				{posts.map((p) => (
					<Post key={p._id} p={p} />
				))}
			</div>
		</div>
	);
}

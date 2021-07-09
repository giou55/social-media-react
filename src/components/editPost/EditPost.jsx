import "./editPost.css";
import { Cancel } from "@material-ui/icons";
import { useRef } from "react";
import axios from "axios";

export default function EditPost({ post, setEditPost, updatePost }) {
	const editPost = useRef();
	const postInput = useRef();

	const closeEditPost = () => {
		setEditPost(false);
	};

	const clickHandler = async () => {
		const newpost = {
			...post,
			desc: postInput.current.innerText,
		};
		try {
			await axios.put("/posts/" + post._id, newpost);
			updatePost(newpost);
			setEditPost(false);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="editPost" ref={editPost}>
			<div className="editPostWrapper">
				<div className="editPostHeader">
					<h2>Edit Post</h2>
					<div className="closeEditPost" onClick={closeEditPost}>
						<Cancel />
					</div>
				</div>

				<div
					className="editPostInput"
					role="textbox"
					contentEditable="true"
					suppressContentEditableWarning="true"
					ref={postInput}
				>
					{post.desc}
				</div>

				<button className="editPostButton" onClick={clickHandler}>
					Save post
				</button>
			</div>
		</div>
	);
}

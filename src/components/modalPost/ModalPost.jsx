import "./modalPost.css";
import { useRef } from "react";
import axios from "axios";

export default function ModalPost({ post, setModal, updatePost }) {
	const modal = useRef();
	const postBody = useRef();

	const closeModalPost = () => {
		setModal(false);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const newpost = {
            ...post,
			desc: postBody.current.value,
		};
		try {
			await axios.put("/posts/" + post._id, newpost);
			updatePost(newpost);
            setModal(false);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="modalPost" ref={modal}>
			<div className="modalPostWrapper">
				<form onSubmit={handleSubmit}>
					<textarea
						type="text"
						rows="10"
						cols="30"
						ref={postBody}
						defaultValue={post.desc}
						required
					></textarea>
					<button type="submit">Save post</button>
				</form>

				<div className="closeModalPost" onClick={closeModalPost}>
					X
				</div>
			</div>
		</div>
	);
}

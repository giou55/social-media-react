import "./editPost.css";
import { Cancel } from "@material-ui/icons";
import { useRef, useState } from "react";
import axios from "axios";

export default function EditPost({
	post,
	setEditPost,
	updatePost,
}) {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const editPost = useRef();
	const postInput = useRef();
	const [newImgFile, setNewImgFile] = useState("");
	const [isDeleted, setIsDeleted] = useState(false);

	const closeEditPost = () => {
		setEditPost(false);
	};

	const changePhotoHandler = (e) => {
		setNewImgFile(e.target.files[0]);
		e.target.value = null;
	};

	const savePost = async () => {
		const newpost = {
			...post,
			desc: postInput.current.innerText,
		};
		if (newImgFile) {
			const data = new FormData();
			const fileName = Date.now() + newImgFile.name;
			data.append("name", fileName);
			data.append("file", newImgFile);
			newpost.img = fileName;
			try {
				await axios.post("/upload/posts", data);
			} catch (err) {
				console.log(err);
			}
		}
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
					<h3>Edit Post</h3>
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

				{post.img !== "" && !isDeleted && (
					<div className="editPostImgContainer">
						{!newImgFile && (
							<div className="editPostImg">
								<img
									src={
										post.img
											? PF + "/posts/" + post.img
											: ""
									}
									alt=""
								/>
							</div>
						)}
						{newImgFile && (
							<div className="editPostImg">
								<img
									src={URL.createObjectURL(newImgFile)}
									alt=""
								/>
							</div>
						)}
						{post.img !== "" && (
							<div className="editPostImgChange">
								<form>
									<div>
										<label
											htmlFor="imgFile"
											className="editPostImgLabel"
										>
											<span className="editPostImgText">
												Change photo
											</span>
											<input
												style={{ display: "none" }}
												type="file"
												id="imgFile"
												accept=".png,.jpeg,.jpg"
												onChange={(e) =>
													changePhotoHandler(e)
												}
											/>
										</label>
									</div>
								</form>
							</div>
						)}
					</div>
				)}

				<button className="editPostButton" onClick={savePost}>
					Save
				</button>
			</div>
		</div>
	);
}

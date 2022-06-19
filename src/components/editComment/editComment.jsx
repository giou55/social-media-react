import "./editComment.css";
import { Cancel } from "@material-ui/icons";
import { useRef, useState } from "react";
import { CircularProgress } from "@material-ui/core";
import axios from "axios";

export default function EditComment({ post, setEditPost, updatePost }) {
	const API_URL = process.env.REACT_APP_API_URL;

	const editPost = useRef();
	const postInput = useRef();
	const [newImgFile, setNewImgFile] = useState("");
	const [isSaving, setIsSaving] = useState(false);

	const closeEditPost = () => {
		setEditPost(false);
	};

	const changePhotoHandler = (e) => {
		setNewImgFile(e.target.files[0]);
		e.target.value = null;
	};

	const savePost = async () => {
		setIsSaving(true);
		const newpost = {
			...post,
			desc: postInput.current.innerText,
		};
		if (newImgFile) {
			const data = new FormData();
			const fileName = Date.now() + newImgFile.name;
			data.append("name", fileName);
			data.append("file", newImgFile);
			try {
				const res = await axios.post(API_URL + "/upload/posts", data);
				if(post.img){
					axios.get(API_URL + "/s3-images/delete/" + post.img);
				}
				newpost.img = res.data.key;
			} catch (err) {
				console.log(err);
			}
		}
		try {
			await axios.put(API_URL + "/posts/" + post._id, newpost);
			updatePost(newpost);
			setIsSaving(false);
			closeEditPost();
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

				{post.img !== "" && (
					<div className="editPostImgContainer">
						{!newImgFile && (
							<div className="editPostImg">
								<img
									src={
										post.img
											? API_URL + "/s3-images/" + post.img
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
				{isSaving ? (
								<CircularProgress style={{ color: '#fff' }} size="14px" />
							) : (
								"Save"
							)}
				</button>
			</div>
		</div>
	);
}

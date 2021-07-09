import "./editProfile.css";
import { Cancel } from "@material-ui/icons";
import { useRef } from "react";
import axios from "axios";

export default function EditProfile({
	profile,
	setEditProfile,
	updateProfile,
}) {
	const editPost = useRef();
	const postInput = useRef();

	const closeEditProfile = () => {
		setEditProfile(false);
	};

	const clickHandler = async () => {
		const newprofile = {
			...profile,
			username: postInput.current.innerText,
		};
		try {
			await axios.put("/users/" + profile._id, newprofile);
			updateProfile(newprofile);
			setEditProfile(false);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="editPost" ref={editPost}>
			<div className="editPostWrapper">
				<div className="editPostHeader">
					<h3>Edit Profile</h3>
					<div className="closeEditPost" onClick={closeEditProfile}>
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
					{profile.username}
				</div>

				<button className="editPostButton" onClick={clickHandler}>
					Save profile
				</button>
			</div>
		</div>
	);
}

import "./editProfile.css";
import { Cancel } from "@material-ui/icons";
import { useRef, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function EditProfile({
	profile,
	setEditProfile,
	updateProfile,
}) {
	const editProfile = useRef();
	const profileDesc = useRef();
	const profileCity = useRef();
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const { user } = useContext(AuthContext);

	const closeEditProfile = () => {
		setEditProfile(false);
		console.log(user);
	};

	const submitHandler = async (e) => {
		e.preventDefault();
		const newprofile = {
			...profile,
			desc: profileDesc.current.innerText,
			city: profileCity.current.innerText,
		};
		try {
			await axios.put("/users/" + profile._id, newprofile);
			updateProfile(newprofile);
			setEditProfile(false);
			window.location.reload();
		} catch (err) {
			console.log(err);
		}
	};

	// const clickHandler = async () => {
	// 	const newprofile = {
	// 		...profile,
	// 		desc: profileDesc.current.innerText,
	// 	};
	// 	try {
	// 		await axios.put("/users/" + profile._id, newprofile);
	// 		updateProfile(newprofile);
	// 		setEditProfile(false);
	// 	} catch (err) {
	// 		console.log(err);
	// 	}
	// };

	return (
		<div className="editProfile" ref={editProfile}>
			<div className="editProfileWrapper">
				<div className="editProfileHeader">
					<h3>Edit Profile</h3>
					<div
						className="closeEditProfile"
						onClick={closeEditProfile}
					>
						<Cancel />
					</div>
				</div>

				<div>
					<img
						src={
							profile.profilePicture
								? PF + profile.profilePicture
								: PF + "/users/noAvatar.png"
						}
						alt=""
						className="editProfileUserImg"
					/>
				</div>

				<div>
					<img
						src={
							profile.coverPicture
								? PF + profile.coverPicture
								: PF + "/users/noCover.png"
						}
						alt=""
						className="editProfileCoverImg"
					/>
				</div>

				<div className="editProfileHeader">Description</div>
				<div
					className="editProfileInput"
					role="textbox"
					contentEditable="true"
					suppressContentEditableWarning="true"
					ref={profileDesc}
				>
					{profile.desc}
				</div>

				<div className="editProfileHeader">City</div>
				<div
					className="editProfileInput"
					role="textbox"
					contentEditable="true"
					suppressContentEditableWarning="true"
					ref={profileCity}
				>
					{profile.city}
				</div>

				<form onSubmit={submitHandler}>
					<div className="editProfileFieldWrapper">
						<div className="editProfileHeader">Sex</div>
						<input
							className="editProfileRadio"
							type="radio"
							id="male"
							name="sex"
						/>
						<label htmlFor="male">Male</label>
						<input
							className="editProfileRadio"
							type="radio"
							id="female"
							name="sex"
						/>
						<label htmlFor="female">Female</label>
					</div>

					<div className="editProfileFieldWrapper">
						<div className="editProfileHeader">Birthday</div>
						<input
							type="date"
							id="birthday"
							name="birthday"
						></input>
					</div>

					<div className="editProfileFieldWrapper">
						<div className="editProfileHeader">Relationship</div>
						<input
							className="editProfileRadio"
							type="radio"
							id="single"
							name="relationship"
						/>
						<label htmlFor="single">Single</label>
						<input
							className="editProfileRadio"
							type="radio"
							id="married"
							name="relationship"
						/>
						<label htmlFor="married">Married</label>
						<input
							className="editProfileRadio"
							type="radio"
							id="complicated"
							name="relationship"
						/>
						<label htmlFor="complicated">Complicated</label>
					</div>

					<button className="editProfileButton" type="submit">
						Save
					</button>
				</form>

				{/* <button className="editProfileButton" onClick={clickHandler}>
					Save profile
				</button> */}
			</div>
		</div>
	);
}

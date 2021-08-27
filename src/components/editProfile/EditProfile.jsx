import "./editProfile.css";
import { Cancel } from "@material-ui/icons";
import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

export default function EditProfile({ setEditProfile }) {
	const editProfile = useRef();
	const profileDesc = useRef();
	const profileCity = useRef();

	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const API_URL = process.env.REACT_APP_API_URL;

	const profile = useSelector((state) => state.user);
	const [newProfileImg, setNewProfileImg] = useState("");
	const [newCoverImg, setNewCoverImg] = useState("");

	const dispatch = useDispatch();

	const closeEditProfile = () => {
		setEditProfile(false);
	};

	const changeCoverImg = (e) => {
		setNewCoverImg(e.target.files[0]);
		e.target.value = null;
	};

	const changeProfileImg = (e) => {
		setNewProfileImg(e.target.files[0]);
		e.target.value = null;
	};

	const onSexValueChange = (event) => {
		const newprofile = {
			...profile,
			sex: event.target.value,
		};
		dispatch({ type: "UPDATE", payload: newprofile });
	};

	const onBirthdayValueChange = (event) => {
		const newprofile = {
			...profile,
			birthday: event.target.value,
		};
		dispatch({ type: "UPDATE", payload: newprofile });
	};

	const onRelationshipValueChange = (event) => {
		const newprofile = {
			...profile,
			relationship: event.target.value,
		};
		dispatch({ type: "UPDATE", payload: newprofile });
	};

	const saveProfile = async () => {
		const newprofile = {
			...profile,
			desc: profileDesc.current.innerText,
			city: profileCity.current.innerText,
		};
		if (newProfileImg) {
			const data = new FormData();
			const fileName = Date.now() + newProfileImg.name;
			data.append("name", fileName);
			data.append("file", newProfileImg);
			// newprofile.profilePicture = fileName;
			try {
				const res = await axios.post(API_URL + "/upload/posts", data);
				newprofile.profilePicture = res.data.key;
				// await axios.post("/upload/users", data);
			} catch (err) {
				console.log(err);
			}
		}
		if (newCoverImg) {
			const data = new FormData();
			const fileName = Date.now() + newCoverImg.name;
			data.append("name", fileName);
			data.append("file", newCoverImg);
			newprofile.coverPicture = fileName;
			try {
				const res = await axios.post(API_URL + "/upload/posts", data);
				newprofile.coverPicture = res.data.key;
				// await axios.post("/upload/users", data);
			} catch (err) {
				console.log(err);
			}
		}
		try {
			await axios.put("/users/" + profile._id, newprofile);
			dispatch({ type: "UPDATE", payload: newprofile });
			setEditProfile(false);
		} catch (err) {
			console.log(err);
		}
	};

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

				<div className="editProfileHeader">
					{profile.firstname} {profile.lastname}
				</div>

				<div className="editProfileImgContainer">
					{!newProfileImg && (
						<div className="editProfileImgProfile">
							<img
								src={
									profile.profilePicture
										? API_URL +
										  "/s3-images/" +
										  profile.profilePicture
										: PF + "/users/noAvatar.png"
								}
								alt=""
							/>
						</div>
					)}
					{newProfileImg && (
						<div className="editProfileImgProfile">
							<img
								src={URL.createObjectURL(newProfileImg)}
								alt=""
							/>
						</div>
					)}
					<div className="editProfileImgForm">
						<form>
							<div>
								<label
									htmlFor="profileFile"
									className="editProfileImgLabel"
								>
									<span className="editProfileImgText">
										Change photo
									</span>
									<input
										style={{ display: "none" }}
										type="file"
										id="profileFile"
										accept=".png,.jpeg,.jpg"
										onChange={(e) => changeProfileImg(e)}
									/>
								</label>
							</div>
						</form>
					</div>
				</div>

				<div className="editProfileImgContainer">
					{!newCoverImg && (
						<div className="editProfileImgCover">
							<img
								src={
									profile.coverPicture
										? API_URL +
										  "/s3-images/" +
										  profile.coverPicture
										: PF + "/users/noCover.png"
								}
								alt=""
							/>
						</div>
					)}
					{newCoverImg && (
						<div className="editProfileImgCover">
							<img
								src={URL.createObjectURL(newCoverImg)}
								alt=""
							/>
						</div>
					)}
					<div className="editProfileImgForm">
						<form>
							<div>
								<label
									htmlFor="coverFile"
									className="editProfileImgLabel"
								>
									<span className="editProfileImgText">
										Change photo
									</span>
									<input
										style={{ display: "none" }}
										type="file"
										id="coverFile"
										accept=".png,.jpeg,.jpg"
										onChange={(e) => changeCoverImg(e)}
									/>
								</label>
							</div>
						</form>
					</div>
				</div>

				<div className="editProfileHeader">Description</div>
				<div
					className="editProfileInput"
					role="textbox"
					contentEditable="true"
					suppressContentEditableWarning="true"
					ref={profileDesc}
				>
					{profile.desc ? profile.desc : "Hello my friends!"}
				</div>

				<div className="editProfileHeader">City</div>
				<div
					className="editProfileInput"
					role="textbox"
					contentEditable="true"
					suppressContentEditableWarning="true"
					ref={profileCity}
				>
					{profile.city === "-" ? "" : profile.city}
				</div>

				<form>
					<div className="editProfileFieldWrapper">
						<div className="editProfileHeader">Sex</div>
						<input
							className="editProfileRadio"
							type="radio"
							id="male"
							value="Male"
							checked={profile.sex === "Male"}
							name="sex"
							onChange={onSexValueChange}
						/>
						<label htmlFor="male">Male</label>
						<input
							className="editProfileRadio"
							type="radio"
							id="female"
							value="Female"
							checked={profile.sex === "Female"}
							name="sex"
							onChange={onSexValueChange}
						/>
						<label htmlFor="female">Female</label>
					</div>

					<div className="editProfileFieldWrapper">
						<div className="editProfileHeader">Birthday</div>
						<input
							type="date"
							id="birthday"
							name="birthday"
							value={profile.birthday}
							onChange={onBirthdayValueChange}
						></input>
					</div>

					<div className="editProfileFieldWrapper">
						<div className="editProfileHeader">Relationship</div>
						<input
							className="editProfileRadio"
							type="radio"
							id="single"
							name="relationship"
							value="Single"
							checked={profile.relationship === "Single"}
							onChange={onRelationshipValueChange}
						/>
						<label htmlFor="single">Single</label>
						<input
							className="editProfileRadio"
							type="radio"
							id="married"
							name="relationship"
							value="Married"
							checked={profile.relationship === "Married"}
							onChange={onRelationshipValueChange}
						/>
						<label htmlFor="married">Married</label>
						<input
							className="editProfileRadio"
							type="radio"
							id="complicated"
							name="relationship"
							value="Complicated"
							checked={profile.relationship === "Complicated"}
							onChange={onRelationshipValueChange}
						/>
						<label htmlFor="complicated">Complicated</label>
					</div>
				</form>

				<button className="editProfileButton" onClick={saveProfile}>
					Save
				</button>
			</div>
		</div>
	);
}

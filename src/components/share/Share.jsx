import "./share.css";
import {
	PermMedia,
	Label,
	Room,
	EmojiEmotions,
	Cancel,
} from "@material-ui/icons";
import { useRef, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function Share({ user }) {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const API_URL = process.env.REACT_APP_API_URL;

	const desc = useRef();
	const fileInput = useRef();
	const history = useHistory();

	const [file, setFile] = useState(null);
	const [isDisabled, setIsDisabled] = useState(true);

	const setButton = () => {
		if (
			desc.current.value !== "" ||
			fileInput.current.files[0] !== undefined
		) {
			setIsDisabled(false);
		} else {
			setIsDisabled(true);
		}
	};

	const changeInputHandler = (e) => {
		setFile(e.target.files[0]);
		setButton();
		e.target.value = null;
	};

	const cancelFileHandler = () => {
		setFile(null);
	};

	const submitHandler = async (e) => {
		e.preventDefault();
		const newpost = {
			userId: user._id,
			desc: desc.current.value,
		};
		if (file) {
			const data = new FormData();
			const fileName = Date.now() + file.name;
			data.append("name", fileName);
			data.append("file", file);
			try {
				const res = await axios.post(API_URL + "/upload/posts", data);
				newpost.img = res.data.key;
			} catch (err) {
				console.log(err);
			}
		}
		try {
			await axios.post(API_URL + "/posts", newpost);
			if (window.location.pathname === "/friendbook/") {
				window.location.reload();
			} else {
				history.push("/");
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="share">
			<div className="shareWrapper">
				<div className="shareTop">
					<img
						className="shareProfileImg"
						src={
							user.profilePicture
								? API_URL + "/s3-images/" + user.profilePicture
								: PF + "/users/noAvatar.png"
						}
						alt=""
					/>
					<input
						placeholder={
							"What's in your mind " + user.firstname + "?"
						}
						className="shareInput"
						ref={desc}
						onChange={setButton}
					/>
				</div>

				<hr className="shareHr" />

				{file && (
					<div className="shareImgContainer">
						<img
							className="shareImg"
							src={URL.createObjectURL(file)}
							alt=""
						/>
						<Cancel
							className="shareCancelImg"
							fontSize="large"
							onClick={cancelFileHandler}
						/>
					</div>
				)}

				<form className="shareBottom" onSubmit={submitHandler}>
					<div className="shareOptions">
						<label htmlFor="file" className="shareOption">
							<PermMedia
								htmlColor="tomato"
								className="shareIcon"
							/>
							<span className="shareOptionText">Photo</span>
							<input
								style={{ display: "none" }}
								type="file"
								id="file"
								accept=".png,.jpeg,.jpg"
								onChange={(e) => changeInputHandler(e)}
								ref={fileInput}
							/>
						</label>
						<div
							className="shareOption"
							style={{ cursor: "not-allowed" }}
						>
							<Label htmlColor="blue" className="shareIcon" />
							<span className="shareOptionText">Tag</span>
						</div>
						<div
							className="shareOption"
							style={{ cursor: "not-allowed" }}
						>
							<Room htmlColor="green" className="shareIcon" />
							<span className="shareOptionText">Location</span>
						</div>
						<div
							className="shareOption"
							style={{ cursor: "not-allowed" }}
						>
							<EmojiEmotions
								htmlColor="goldenrod"
								className="shareIcon"
							/>
							<span className="shareOptionText">Feelings</span>
						</div>
					</div>
					<button
						className="shareButton"
						type="submit"
						disabled={isDisabled}
					>
						Share
					</button>
				</form>
			</div>
		</div>
	);
}

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

export default function Share({ user }) {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const desc = useRef();
	const fileInput = useRef();
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
			newpost.img = fileName;
			try {
				await axios.post("/upload/posts", data);
			} catch (err) {
				console.log(err);
			}
		}
		try {
			await axios.post("/posts", newpost);
			window.location.reload();
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
								? PF + "/users/" + user.profilePicture
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
						<div className="shareOption">
							<Label htmlColor="blue" className="shareIcon" />
							<span className="shareOptionText">Tag</span>
						</div>
						<div className="shareOption">
							<Room htmlColor="green" className="shareIcon" />
							<span className="shareOptionText">Location</span>
						</div>
						<div className="shareOption">
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

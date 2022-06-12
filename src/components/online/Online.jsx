import "./online.css";

export default function Online({ user }) {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const API_URL = process.env.REACT_APP_API_URL;

	return (
		<li className="rightbarFriend">
			<div className="rightbarProfileImgContainer">
				<img
					className="rightbarProfileImg"
					src={
						user.profilePicture
							? API_URL + "/s3-images/" + user.profilePicture
							: PF + "/users/noAvatar.png"
					}
					alt=""
				/>
				<span className="rightbarOnline"></span>
			</div>
			<span className="rightbarUsername">{user.firstname} {user.lastname}</span>
		</li>
	);
}

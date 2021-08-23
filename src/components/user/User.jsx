import "./user.css";

export default function User({ user }) {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const API_URL = process.env.REACT_APP_API_URL;

	return (
		<li className="sidebarUser">
			<img
				className="sidebarUserImg"
				src={
					user.profilePicture
						? API_URL + "/s3-images/" + user.profilePicture
						: PF + "/users/noAvatar.png"
				}
				alt=""
			/>
			<span className="sidebarUserName">
				{user.firstname} {user.lastname}
			</span>
		</li>
	);
}

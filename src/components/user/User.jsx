import "./user.css";

export default function User({ user }) {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;

	return (
		<li className="sidebarUser">
			<img
				className="sidebarUserImg"
				src={
					user.profilePicture
						? PF + "/users/" + user.profilePicture
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

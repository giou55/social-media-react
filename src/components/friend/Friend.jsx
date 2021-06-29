import "./friend.css";

export default function Friend({user}) {
    return (
		<li className="sidebarFriend">
			<img
				className="sidebarFriendImg"
				src={`/assets/${user.profilePicture}`}
				alt=""
			/>
			<span className="sidebarFriendName">{user.username}</span>
		</li>
	);
}

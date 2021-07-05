import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import ProfileRightbar from "../../components/profileRightbar/ProfileRightbar";
import "./profile.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router";

export default function Profile() {
	const [user, setUser] = useState({});
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const username = useParams().username;

	useEffect(() => {
		const fetchUserData = async () => {
			const res = await axios.get(`/users?username=${username}`);
			setUser(res.data);
		};
		fetchUserData();
	}, [username]);

	return (
		<>
			<Topbar />
			<div className="profile">
				<Sidebar />
				<div className="profileRight">
					<div className="profileRightTop">
						<div className="profileCover">
							<img
								src={
									user.coverPicture
										? PF + user.coverPicture
										: PF + "/person/noCover.png"
								}
								alt=""
								className="profileCoverImg"
							/>
							<img
								src={
									user.profilePicture
										? PF + user.profilePicture
										: PF + "/person/noAvatar.png"
								}
								alt=""
								className="profileUserImg"
							/>
						</div>
						<div className="profileInfo">
							<h4 className="profileInfoName">{user.username}</h4>
							<span className="profileInfoDesc">
								{user.desc ? user.desc : "Hello World!"}
							</span>
						</div>
					</div>
					<div className="profileRightBottom">
						<Feed username={username} />
						{user && <ProfileRightbar user={user} />}
					</div>
				</div>
			</div>
		</>
	);
}

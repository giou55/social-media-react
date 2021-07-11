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
	const fullname = useParams().fullname;
	const firstname = fullname.split(".")[0];
	const lastname = fullname.split(".")[1];

	useEffect(() => {
		const fetchUserData = async () => {
			const res = await axios.get(
				`/users?firstname=${firstname}&lastname=${lastname}`
			);
			setUser(res.data);
		};
		fetchUserData();
	}, [firstname, lastname]);

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
										: PF + "/users/noCover.png"
								}
								alt=""
								className="profileCoverImg"
							/>
							<img
								src={
									user.profilePicture
										? PF + user.profilePicture
										: PF + "/users/noAvatar.png"
								}
								alt=""
								className="profileUserImg"
							/>
						</div>
						<div className="profileInfo">
							<h4 className="profileInfoName">
								{user.firstname} {user.lastname}
							</h4>
							<span className="profileInfoDesc">
								{user.desc ? user.desc : "Hello my friends!"}
							</span>
						</div>
					</div>
					<div className="profileRightBottom">
						<Feed userId={user._id} />
						{user.firstname && <ProfileRightbar user={user} />}
					</div>
				</div>
			</div>
		</>
	);
}

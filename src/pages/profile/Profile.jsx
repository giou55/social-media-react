import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import ProfileRightbar from "../../components/profileRightbar/ProfileRightbar";
import "./profile.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

export default function Profile() {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const [profile, setProfile] = useState("");
	const fullname = useParams().fullname;
	const firstname = fullname.split(".")[0];
	const lastname = fullname.split(".")[1];
	const user = useSelector((state) => state.user);

	useEffect(() => {
		const fetchProfileData = async () => {
			const res = await axios.get(
				`/users?firstname=${firstname}&lastname=${lastname}`
			);
			if (res.data._id === user._id) {
				setProfile(user);
			} else {
				setProfile(res.data);
			}
		};
		fetchProfileData();
	}, [firstname, lastname, user]);

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
									profile.coverPicture
										? PF + "/users/" + profile.coverPicture
										: PF + "/users/noCover.png"
								}
								alt=""
								className="profileCoverImg"
							/>
							<img
								src={
									profile.profilePicture
										? PF + profile.profilePicture
										: PF + "/users/noAvatar.png"
								}
								alt=""
								className="profileUserImg"
							/>
						</div>
						<div className="profileInfo">
							<h4 className="profileInfoName">
								{profile.firstname} {profile.lastname}
							</h4>
							<span className="profileInfoDesc">
								{profile.desc
									? profile.desc
									: "Hello my friends!"}
							</span>
						</div>
					</div>
					<div className="profileRightBottom">
						{profile && <Feed profile={profile} />}
						{profile && <ProfileRightbar profile={profile} />}
					</div>
				</div>
			</div>
		</>
	);
}

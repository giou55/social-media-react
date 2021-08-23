import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import ProfileRightbar from "../../components/profileRightbar/ProfileRightbar";
import "./profile.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";

export default function Profile() {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const API_URL = process.env.REACT_APP_API_URL;

	const [profile, setProfile] = useState("");

	const fullname = useParams().fullname;
	const firstname = fullname.split(".")[0];
	const lastname = fullname.split(".")[1];

	const userId = useSelector((state) => state.userId);
	const user = useSelector((state) => state.user);

	const dispatch = useDispatch();

	useEffect(() => {
		const fetchUser = async () => {
			const res = await axios.get("/users?userId=" + userId);
			dispatch({ type: "UPDATE", payload: res.data });
		};
		fetchUser();
	}, [userId, dispatch]);

	useEffect(() => {
		const fetchProfileData = async () => {
			const res = await axios.get(
				`/users?firstname=${firstname}&lastname=${lastname}`
			);
			setProfile(res.data);
		};
		fetchProfileData();
	}, [firstname, lastname, user]);

	return (
		<>
			{user && <Topbar user={user} />}
			<div className="profile">
				{user && <Sidebar user={user} />}
				<div className="profileRight">
					<div className="profileRightTop">
						<div className="profileCover">
							<img
								src={
									profile.coverPicture
										? API_URL +
										  "/s3-images/" +
										  profile.coverPicture
										: PF + "/users/noCover.png"
								}
								alt=""
								className="profileCoverImg"
							/>
							<img
								src={
									profile.profilePicture
										? API_URL +
										  "/s3-images/" +
										  profile.profilePicture
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

import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import EditProfile from "../editProfile/EditProfile";

export default function Topbar() {
	const { user } = useContext(AuthContext);
	const [profile, setProfile] = useState(user);
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const [isDisplayedActions, setIsDisplayedActions] = useState(false);
	const [isDisplayedEditProfile, setIsDisplayedEditProfile] = useState(false);

	const toggleActions = () => {
		setIsDisplayedActions(!isDisplayedActions);
	};

	const showEditProfile = () => {
		setIsDisplayedActions(false);
		setIsDisplayedEditProfile(true);
	};

	const logout = () => {
		localStorage.removeItem("user");
		window.location.reload();
	};

	return (
		<>
			<div className="topbarContainer">
				<div className="topbarLeft">
					<Link to="/" style={{ textDecoration: "none" }}>
						<span className="logo">Friendbook</span>
					</Link>
				</div>
				<div className="topbarCenter">
					<div className="searchbar">
						<Search className="searchIcon" />
						<input
							placeholder="Search for friend, post or video"
							className="searchInput"
						/>
					</div>
				</div>
				<div className="topbarRight">
					<div className="topbarLinks">
						<span className="topbarLink">Homepage</span>
						<span className="topbarLink">Timeline</span>
					</div>
					<div className="topbarIcons">
						<div className="topbarIconItem">
							<Person />
							<span className="topbarIconBadge">1</span>
						</div>
						<div className="topbarIconItem">
							<Chat />
							<span className="topbarIconBadge">2</span>
						</div>
						<div className="topbarIconItem">
							<Notifications />
							<span className="topbarIconBadge">1</span>
						</div>
					</div>
					<div
						className="topbarProfilePicture"
						onClick={toggleActions}
					>
						<img
							src={
								user.profilePicture
									? PF + user.profilePicture
									: PF + "/users/noAvatar.png"
							}
							alt=""
							className="topbarImg"
						/>
						{isDisplayedActions && (
							<div className="topbarProfileActions">
								<Link
									to={`/profile/${user.firstname}.${user.lastname}`}
									style={{ textDecoration: "none" }}
								>
									<div>View profile</div>
								</Link>
								<div onClick={showEditProfile}>
									Edit profile
								</div>
								<div onClick={logout}>Logout</div>
							</div>
						)}
					</div>
					<div>{user.firstname}</div>
				</div>
			</div>
			{isDisplayedEditProfile && (
				<EditProfile
					profile={profile}
					setEditProfile={setIsDisplayedEditProfile}
					updateProfile={setProfile}
				/>
			)}
		</>
	);
}

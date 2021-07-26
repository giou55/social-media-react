import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import EditProfile from "../editProfile/EditProfile";
import axios from "axios";

export default function Topbar() {
	const { user} = useContext(AuthContext);
	const [profile, setProfile] = useState(user);
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const authCtx = useContext(AuthContext);
	const [isDisplayedActions, setIsDisplayedActions] = useState(false);
	const [isDisplayedEditProfile, setIsDisplayedEditProfile] = useState(false);

	const toggleActions = () => {
		setIsDisplayedActions(!isDisplayedActions);
	};

	const showEditProfile = () => {
		setIsDisplayedActions(false);
		setIsDisplayedEditProfile(true);
	};

	const deleteAcount = (userId) => {
		try {
			axios.delete("/users/" + userId);
			authCtx.logout();
		} catch (err) {
			console.log(err);
		}
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
					<div className="topbarProfile" onClick={toggleActions}>
						<img
							src={
								user.profilePicture
									? PF + user.profilePicture
									: PF + "/users/noAvatar.png"
							}
							alt=""
							className="topbarProfileImage"
						/>
						<div>{user.firstname}</div>

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
								<div onClick={deleteAcount}>Delete account</div>
								<div onClick={authCtx.logout}>Logout</div>
							</div>
						)}
					</div>
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

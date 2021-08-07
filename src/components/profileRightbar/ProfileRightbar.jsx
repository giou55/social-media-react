import "./profilerightbar.css";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Add, Remove } from "@material-ui/icons";
// import { AuthContext } from "../../context/AuthContext";

import { useSelector } from "react-redux";

export default function ProfileRightbar({ profile }) {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	// const { user, dispatch } = useContext(AuthContext);
	const user = useSelector((state) => state.user);
	
	const [friends, setFriends] = useState([]);
	const [followed, setFollowed] = useState(
		profile.followers.includes(user?._id)
	);

	useEffect(() => {
		const fetchUserFriends = async () => {
			try {
				const friendList = await axios.get(
					`/users/friends/${profile._id}`
				);
				setFriends(friendList.data);
			} catch (err) {
				console.log(err);
			}
		};
		setFollowed(profile.followers.includes(user?._id));
		fetchUserFriends();
	}, [profile, user]);

	const handleClick = async () => {
		try {
			if (followed) {
				await axios.put("/users/" + profile._id + "/unfollow", {
					userId: user._id,
				});
			} else {
				await axios.put("/users/" + profile._id + "/follow", {
					userId: user._id,
				});
			}
			setFollowed(!followed);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="rightbar">
			<div className="rightbarWrapper">
				{profile.email !== user.email && (
					<button
						className="rightbarFollowButton"
						onClick={handleClick}
					>
						{followed ? "Unfollow" : "Follow"}
						{followed ? <Remove /> : <Add />}
					</button>
				)}
				<h4 className="rightbarTitle">User information</h4>
				<div className="rightbarInfo">
					<div className="rightbarInfoItem">
						<span className="rightbarInfoKey">City:</span>
						<span className="rightbarInfoValue">
							{profile.city ? profile.city : "New York"}
						</span>
					</div>
					<div className="rightbarInfoItem">
						<span className="rightbarInfoKey">Sex:</span>
						<span className="rightbarInfoValue">
							{profile.from ? profile.from : "Undefined"}
						</span>
					</div>
					<div className="rightbarInfoItem">
						<span className="rightbarInfoKey">Birthday:</span>
						<span className="rightbarInfoValue">
							{profile.birthday ? profile.birthday : "Undefined"}
						</span>
					</div>
					<div className="rightbarInfoItem">
						<span className="rightbarInfoKey">Relationship:</span>
						<span className="rightbarInfoValue">
							{profile.relationship
								? profile.relationship
								: "Undefined"}
							{/* {user.relationship === 1 ? "Single" : user.relationship === 2 ? "Married" : "-"} */}
						</span>
					</div>
				</div>
				<h4 className="rightbarTitle">User friends</h4>
				<div className="rightbarFollowings">
					{friends.map((friend) => (
						<Link
							key={friend._id}
							to={
								"/profile/" +
								friend.firstname +
								"." +
								friend.lastname
							}
							style={{ textDecoration: "none" }}
						>
							<div className="rightbarFollowing">
								<img
									src={
										friend.profilePicture
											? PF + friend.profilePicture
											: PF + "/users/noAvatar.png"
									}
									alt=""
									className="rightbarFollowingImg"
								/>
								<div className="rightbarFollowingName">
									<div>{friend.firstname}</div>
									<div>{friend.lastname}</div>
								</div>
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}

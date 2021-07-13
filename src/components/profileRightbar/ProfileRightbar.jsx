import "./profilerightbar.css";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@material-ui/icons";

export default function ProfileRightbar({ user }) {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const { user: currentUser, dispatch } = useContext(AuthContext);
	const [friends, setFriends] = useState([]);
	const [followed, setFollowed] = useState(
		currentUser.followings.includes(user?._id)
	);

	useEffect(() => {
		setFollowed(currentUser.followings.includes(user?._id));
	}, [currentUser, user._id]);

	useEffect(() => {
		const fetchUserFriends = async () => {
			const friendList = user
				? await axios.get(`/users/friends/${user._id}`)
				: [];
			setFriends(friendList.data);
		};
		fetchUserFriends();
	}, [user]);

	const handleClick = async () => {
		try {
			if (followed) {
				await axios.put("/users/" + user._id + "/unfollow", {
					userId: currentUser._id,
				});
				dispatch({ type: "UNFOLLOW", payload: user._id });
			} else {
				await axios.put("/users/" + user._id + "/follow", {
					userId: currentUser._id,
				});
				dispatch({ type: "FOLLOW", payload: user._id });
			}
			setFollowed(!followed);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="rightbar">
			<div className="rightbarWrapper">
				{user.email !== currentUser.email && (
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
							{user.city ? user.city : "New York"}
						</span>
					</div>
					<div className="rightbarInfoItem">
						<span className="rightbarInfoKey">Sex:</span>
						<span className="rightbarInfoValue">
							{user.from ? user.from : "Undefined"}
						</span>
					</div>
					<div className="rightbarInfoItem">
						<span className="rightbarInfoKey">Birthday:</span>
						<span className="rightbarInfoValue">
							{user.birthday ? user.birthday : "Undefined"}
						</span>
					</div>
					<div className="rightbarInfoItem">
						<span className="rightbarInfoKey">Relationship:</span>
						<span className="rightbarInfoValue">
							{user.relationship
								? user.relationship
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

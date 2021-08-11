import "./profilerightbar.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Add, Remove } from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";

export default function ProfileRightbar({ profile }) {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const user = useSelector((state) => state.user);

	const [friends, setFriends] = useState([]);
	const [followed, setFollowed] = useState(
		profile.followers.includes(user?._id)
	);
	const dispatch = useDispatch();

	if (profile._id === user._id) {
		profile = user;
	}

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

	const followingHandler = async () => {
		try {
			if (followed) {
				await axios.put("/users/" + profile._id + "/unfollow", {
					userId: user._id,
				});
				const updatedUser = {
					...user,
					followings: user.followings.filter(
						(following) => following !== profile._id
					),
				};
				dispatch({ type: "UNFOLLOW", payload: updatedUser });
			} else {
				await axios.put("/users/" + profile._id + "/follow", {
					userId: user._id,
				});
				const updatedUser = {
					...user,
					followings: [...user.followings, profile._id]
				};
				dispatch({ type: "FOLLOW", payload: updatedUser });
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
						onClick={followingHandler}
					>
						{followed ? "Unfollow" : "Follow"}
						{followed ? <Remove /> : <Add />}
					</button>
				)}
				<h4 className="rightbarTitle">Ιnformation</h4>
				<div className="rightbarInfo">
					<div className="rightbarInfoItem">
						<span className="rightbarInfoKey">City:</span>
						<span className="rightbarInfoValue">
							{profile.city === "" ? "-" : profile.city}
						</span>
					</div>
					<div className="rightbarInfoItem">
						<span className="rightbarInfoKey">Sex:</span>
						<span className="rightbarInfoValue">{profile.sex}</span>
					</div>
					<div className="rightbarInfoItem">
						<span className="rightbarInfoKey">Birthday:</span>
						<span className="rightbarInfoValue">
							{profile.birthday ? profile.birthday : "-"}
						</span>
					</div>
					<div className="rightbarInfoItem">
						<span className="rightbarInfoKey">Relationship:</span>
						<span className="rightbarInfoValue">
							{profile.relationship}
						</span>
					</div>
				</div>
				<h4 className="rightbarTitle">Following</h4>
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

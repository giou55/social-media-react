import "./profilerightbar.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Add, Remove } from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";

export default function ProfileRightbar({ profile }) {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const API_URL = process.env.REACT_APP_API_URL;

	const user = useSelector((state) => state.user);

	const [friends, setFriends] = useState([]);
	const [followed, setFollowed] = useState(
		profile.followers.includes(user?._id)
	);
	const dispatch = useDispatch();

	if (profile._id === user._id) {
		profile._id = user._id;
	}

	useEffect(() => {
		const fetchUserFriends = async () => {
			try {
				const friendsList = await axios.get(
					API_URL + `/users/friends/${profile._id}`
				);
				setFriends(friendsList.data);
			} catch (err) {
				console.log(err);
			}
		};
		setFollowed(profile.followers.includes(user?._id));
		fetchUserFriends();
	}, [profile, user, API_URL]);

	const followingHandler = async () => {
		try {
			if (followed) {
				await axios.put(
					API_URL + "/users/" + profile._id + "/unfollow",
					{
						userId: user._id,
					}
				);
				const updatedUser = {
					...user,
					followings: user.followings.filter(
						(following) => following !== profile._id
					),
				};
				dispatch({ type: "UNFOLLOW", payload: updatedUser });
			} else {
				await axios.put(API_URL + "/users/" + profile._id + "/follow", {
					userId: user._id,
				});
				const updatedUser = {
					...user,
					followings: [...user.followings, profile._id],
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
							{profile.birthday === "1970-01-01"
								? "-"
								: profile.birthday.split("-")[2] +
								  "/" +
								  profile.birthday.split("-")[1] +
								  "/" +
								  profile.birthday.split("-")[0]}
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
				{friends && 
					friends.map((friend) => (
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
											? API_URL +
											  "/s3-images/" +
											  friend.profilePicture
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

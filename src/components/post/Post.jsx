import "./post.css";
import { MoreVert } from "@material-ui/icons";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { format } from "timeago.js";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import ModalPost from "../modalPost/ModalPost";

export default function Post({ p }) {
	const [post, setPost] = useState(p);
	const [like, setLike] = useState(post.likes.length);
	const [isDeleted, setIsDeleted] = useState(false);
	const [isLiked, setIsLiked] = useState(false);
	const [isDisplayedActions, setIsDisplayedActions] = useState(false);
	const [isDisplayedModal, setIsDisplayedModal] = useState(false);
	const [user, setUser] = useState({});
	const { user: currentUser } = useContext(AuthContext);
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;

	useEffect(() => {
		setIsLiked(post.likes.includes(currentUser._id));
	}, [currentUser._id, post.likes]);

	useEffect(() => {
		const fetchUser = async () => {
			const res = await axios.get(`/users?userId=${post.userId}`);
			setUser(res.data);
		};
		fetchUser();
	}, [post.userId]);

	const likeHandler = () => {
		try {
			axios.put("/posts/" + post._id + "/like", {
				userId: currentUser._id,
			});
		} catch (err) {
			console.log(err);
		}
		setLike(isLiked ? like - 1 : like + 1);
		setIsLiked(!isLiked);
	};

	const toggleActions = () => {
		setIsDisplayedActions(!isDisplayedActions);
	};

	const deletePost = (postId) => {
		try {
			axios.delete("/posts/" + postId);
			setIsDeleted(true);
		} catch (err) {
			console.log(err);
		}
	};

	const showModalPost = () => {
		setIsDisplayedActions(false);
		setIsDisplayedModal(true);
	};

	return (
		<>
			{!isDeleted && (
				<div className="post">
					<div className="postWrapper">
						<div className="postTop">
							<div className="postTopLeft">
								<Link to={`/profile/${user.username}`}>
									<img
										className="postProfileImg"
										src={
											user.profilePicture
												? PF + user.profilePicture
												: PF + "/person/noAvatar.png"
										}
										alt=""
									/>
								</Link>
								<span className="postUsername">
									{user.username}
								</span>
								<span className="postDate">
									{format(post.createdAt)}
								</span>
							</div>
							<div className="postTopRight">
								{user.username === currentUser.username && (
									<>
										<MoreVert
											className="moreVertIcon"
											onClick={toggleActions}
										/>
										{isDisplayedActions && (
											<div className="postTopRightActions">
												<div onClick={showModalPost}>
													Edit post
												</div>
												<div
													onClick={() =>
														deletePost(post._id)
													}
												>
													Delete post
												</div>
											</div>
										)}
									</>
								)}
							</div>
						</div>
						<div className="postCenter">
							<span className="postText">{post?.desc}</span>
							<img
								className="postImg"
								src={post.img ? PF + "/" + post.img : ""}
								alt=""
							/>
						</div>
						<div className="postBottom">
							<div className="postBottomLeft">
								<img
									className="likeIcon"
									src={`${PF}/like.png`}
									onClick={likeHandler}
									alt=""
								/>
								<div className="postLikeCounter">
									{isLiked ? "You and" : ""}{" "}
									{isLiked ? like - 1 : like}{" "}
									{isLiked ? "other" : ""} people like it
								</div>
							</div>
							<div className="postBottomRight">
								<span className="postCommentText">
									{post.comment} comments
								</span>
							</div>
						</div>
					</div>
				</div>
			)}
			{isDisplayedModal && (
				<ModalPost
					post={post}
					setModal={setIsDisplayedModal}
					updatePost={setPost}
				/>
			)}
		</>
	);
}

import "./post.css";
import { MoreVert } from "@material-ui/icons";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { format } from "timeago.js";
import EditPost from "../editPost/EditPost";

export default function Post({ p }) {
	const [post, setPost] = useState(p);
	const [like, setLike] = useState(post.likes.length);
	const [isDeleted, setIsDeleted] = useState(false);
	const [isLiked, setIsLiked] = useState(false);
	const [isDisplayedActions, setIsDisplayedActions] = useState(false);
	const [isDisplayedEditPost, setIsDisplayedEditPost] = useState(false);
	const [user, setUser] = useState({});
	const currentUser = useSelector((state) => state.user);

	const PF = process.env.REACT_APP_PUBLIC_FOLDER;

	useEffect(() => {
		setIsLiked(post.likes.includes(currentUser._id));
	}, [currentUser._id, post.likes]);

	useEffect(() => {
		const cancelToken = axios.CancelToken;
		const source = cancelToken.source();
		const fetchUser = async () => {
			try {
				const res = await axios.get(`/users?userId=${post.userId}`, {
					cancelToken: source.token,
				});
				setUser(res.data);
			} catch (err) {
				if (axios.isCancel(err)) {
					return "request cancelled";
				}
				return err;
			}
		};
		fetchUser();
		return () => {
			source.cancel("request cancelled");
		};
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

	const showEditPost = () => {
		setIsDisplayedActions(false);
		setIsDisplayedEditPost(true);
	};

	return (
		<>
			{!isDeleted && (
				<div className="post">
					<div className="postWrapper">
						<div className="postTop">
							<div className="postTopLeft">
								<Link
									to={`/profile/${user.firstname}.${user.lastname}`}
								>
									<img
										className="postProfileImg"
										src={
											user.profilePicture
												? PF + user.profilePicture
												: PF + "/users/noAvatar.png"
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
								{user._id === currentUser._id && (
									<>
										<MoreVert
											fontSize="large"
											className="moreVertIcon"
											onClick={toggleActions}
										/>
										{isDisplayedActions && (
											<div className="postTopRightActions">
												<div onClick={showEditPost}>
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
								src={post.img ? PF + "/posts/" + post.img : ""}
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
			{isDisplayedEditPost && (
				<EditPost
					post={post}
					setEditPost={setIsDisplayedEditPost}
					updatePost={setPost}
				/>
			)}
		</>
	);
}

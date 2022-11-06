import "./post.css";
import { MoreHoriz } from "@material-ui/icons";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { format } from "timeago.js";
import EditPost from "../editPost/editPost";
import Comment from "../comment/Comment";
//import EditComment from "../editComment/editComment";
import { v4 as uuidv4 } from "uuid";

export default function Post({ p }) {
	const [post, setPost] = useState(p);
	const [like, setLike] = useState(post.likes.length);
	const [comments, setComments] = useState([]);
	const [isDisplayedComments, setIsDisplayedComments] = useState(false);
	const [isDeleted, setIsDeleted] = useState(false);
	const [isLiked, setIsLiked] = useState(false);
	const [isDisplayedPostActions, setIsDisplayedPostActions] = useState(false);
	//const [isDisplayedCommentActions, setIsDisplayedCommentActions] = useState(false);
	const [isDisplayedEditPost, setIsDisplayedEditPost] = useState(false);
	//const [isDisplayedEditComment, setIsDisplayedEditComment] = useState(false);
	const [user, setUser] = useState({});
	const currentUser = useSelector((state) => state.user);

	const commentInput = useRef();

	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const API_URL = process.env.REACT_APP_API_URL;

	useEffect(() => {
		setIsLiked(post.likes.includes(currentUser._id));
	}, [currentUser._id, post.likes]);

	useEffect(() => {
		const cancelToken = axios.CancelToken;
		const source = cancelToken.source();
		const fetchUser = async () => {
			try {
				const res = await axios.get(
					API_URL + `/users?userId=${post.userId}`,
					{
						cancelToken: source.token,
					}
				);
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
	}, [post.userId, currentUser, API_URL]);

	useEffect(() => {
		const fetchPostComments = async () => {
			try {
				const commentList = await axios.get(
					API_URL + `/posts/comments/${p._id}`
				);
				setComments(commentList.data);
			} catch (err) {
				console.log(err);
			}
		};
		fetchPostComments();
	}, [p, API_URL]);

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

	const commentsToggle = () => {
		if (comments.length > 0) {
			setIsDisplayedComments(!isDisplayedComments);
		}
	};

	const togglePostActions = () => {
		setIsDisplayedPostActions(!isDisplayedPostActions);
	};

	// const toggleCommentActions = () => {
	// 	setIsDisplayedCommentActions(!isDisplayedCommentActions);
	// };

	const deletePost = async (post) => {
		try {
			await axios.delete(API_URL + "/posts/" + post._id);
			if(post.img){
				axios.get(API_URL + "/s3-images/delete/" + post.img);
			}
			setIsDeleted(true);
		} catch (err) {
			console.log(err);
		}
	};

	const showEditPost = () => {
		setIsDisplayedPostActions(false);
		setIsDisplayedEditPost(true);
	};

	// const showEditComment = () => {
	// 	setIsDisplayedCommentActions(false);
	// 	setIsDisplayedEditComment(true);
	// };

	// const deleteComment = async (commentId, postId) => {
	// 	try {
	// 		await axios.delete(API_URL + `/comments/${commentId}/${postId}`);
	// 	} catch (err) {
	// 		console.log(err);
	// 	}
	// };

	const submitHandler = async (e) => {
		e.preventDefault();
		const newcomment = {
			id: uuidv4(),
			firstname: currentUser.firstname,
			lastname: currentUser.lastname,
			body: commentInput.current.value,
			img: currentUser.profilePicture,
		};
		try {
			await axios.put(API_URL + `/posts/${p._id}/comment`, newcomment);
			setComments([...comments, newcomment]);
			commentInput.current.value = "";
		} catch (err) {
			console.log(err);
		}
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
									{p.userId === currentUser._id && (
										<img
											className="postProfileImg"
											src={
												user.profilePicture
													? API_URL +
													  "/s3-images/" +
													  user.profilePicture
													: PF + "/users/noAvatar.png"
											}
											alt=""
										/>
									)}
									{p.userId !== currentUser._id && (
										<img
											className="postProfileImg"
											src={
												user.profilePicture
													? API_URL +
													  "/s3-images/" +
													  user.profilePicture
													: PF + "/users/noAvatar.png"
											}
											alt=""
										/>
									)}
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
										<MoreHoriz
											fontSize="large"
											className="moreVertIcon"
											onClick={togglePostActions}
										/>
										{isDisplayedPostActions && (
											<div className="postTopRightActions">
												<div onClick={showEditPost}>
													Edit post
												</div>
												<div
													onClick={() =>
														deletePost(post)
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
								src={
									post.img
										? API_URL + "/s3-images/" + post.img
										: ""
								}
								alt=""
							/>
						</div>
						<div className="postBottom">
							<div className="postBottomLeft">
								<img
									className="likeIcon"
									src={
										process.env.PUBLIC_URL +
										"/assets/like.png"
									}
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
								<span
									className="postCommentText"
									onClick={commentsToggle}
								>
									{comments.length === 1 ? (comments.length+" comment") : (comments.length+" comments")}
								</span>
							</div>
						</div>

						{isDisplayedComments && (
							<div className="postCommentsDisplay">
								{comments.map((comment) => (
									<Comment
										comment={comment}
										p={p}
										user={user}
									 />
								))}
							</div>
						)}
						<div className="postCommentsSubmit">
							<img
								src={
									currentUser.profilePicture
										? API_URL +
										  "/s3-images/" +
										  currentUser.profilePicture
										: PF + "/users/noAvatar.png"
								}
								alt=""
								className="postCommentsImage"
							/>
							<form
								className="postCommentsSubmitForm"
								onSubmit={submitHandler}
							>
								<input
									type="text"
									ref={commentInput}
									placeholder="Write a comment..."
									className="postCommentsSubmitInput"
								/>
							</form>
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
			{/* {isDisplayedEditComment && (
				<EditComment
					post={post}
					setEditPost={setIsDisplayedEditPost}
					updatePost={setPost}
				/>
			)} */}
		</>
	);
}

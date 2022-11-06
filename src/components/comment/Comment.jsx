import "./comment.css";
import { MoreHoriz } from "@material-ui/icons";
import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import EditComment from "../editComment/editComment";

export default function Comment({ comment, p, user }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const API_URL = process.env.REACT_APP_API_URL;

    const [isDisplayedCommentActions, setIsDisplayedCommentActions] = useState(false);
	const [isDisplayedEditComment, setIsDisplayedEditComment] = useState(false);
    const currentUser = useSelector((state) => state.user);


    const toggleCommentActions = () => {
        let divsToHide = document.querySelectorAll('.commentActions');
        for(var i = 0; i < divsToHide.length; i++){
            divsToHide[i].style.display = "none";
        }
		setIsDisplayedCommentActions(!isDisplayedCommentActions);
	};

    const showEditComment = () => {
		setIsDisplayedCommentActions(false);
		setIsDisplayedEditComment(true);
	};

    const deleteComment = async (commentId, postId) => {
        try {
            await axios.delete(API_URL + `/comments/${commentId}/${postId}`);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <div
                key={comment.id}
                className="postCommentsWrapper"
            >
                {p.userId === currentUser._id && (
                    <img
                        src={
                            user.profilePicture
                                ? API_URL +
                                "/s3-images/" +
                                user.profilePicture
                                : PF + "/users/noAvatar.png"
                        }
                        alt=""
                        className="postCommentsImage"
                    />
                )}
                    {p.userId !== currentUser._id && (
                    <img
                        src={
                            user.profilePicture
                                ? API_URL +
                                "/s3-images/" +
                                user.profilePicture
                                : PF + "/users/noAvatar.png"
                        }
                        alt=""
                        className="postCommentsImage"
                    />
                )}

                <div className="postCommentsBody">
                    <div className="postCommentsBodyName">
                        {comment.firstname}{" "}
                        {comment.lastname}
                    </div>
                    <div className="postCommentsBodyText">
                        {comment.body}
                    </div>
                </div>

                <div className="postCommentActions">
                    {user._id === currentUser._id && (
                        <>
                            <MoreHoriz
                                fontSize="medium"
                                className="moreVertIcon"
                                onClick={toggleCommentActions}
                            />
                            {isDisplayedCommentActions && (
                                <div className="commentActions">
                                    <div onClick={showEditComment}>
                                        Edit comment
                                    </div>
                                    <div
                                        onClick={() =>
                                            deleteComment(comment)
                                        }
                                    >
                                        Delete comment
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

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
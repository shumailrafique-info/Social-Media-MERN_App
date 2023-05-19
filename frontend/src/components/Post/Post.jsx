import React, { useEffect, useState } from "react";
import "./Post.css";
import {
  MoreVert,
  Favorite,
  FavoriteBorder,
  ChatBubbleOutline,
  DeleteOutline,
} from "@mui/icons-material";
import { Avatar, Button, Typography, Dialog } from "@mui/material";
import { Link } from "react-router-dom";
import {
  AddComment,
  deletePost,
  getMyPosts,
  likePost,
  updatePost,
} from "../../redux/actions/postAction";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, postsOfFollowingUser } from "../../redux/actions/userAction";
import User from "../User/User";
import CommentCard from "../CommentCard/CommentCard";

const Post = ({
  postId,
  caption,
  postImage,
  likes = [],
  comments = [],
  ownerImage,
  ownerName,
  ownerId,
  isDelete = false,
  isAccount = false,
}) => {
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(false);
  const [postLikes, setPostLikes] = useState(false);
  const [postComment, setPostComment] = useState(false);
  const [captionToggle, setCaptionTogglet] = useState(false);
  const [captionValue, setCaptionValue] = useState(caption);
  const [commentValue, setCommentValue] = useState("");
  const { user } = useSelector((state) => state.user);

  const handleLike = async (postId) => {
    setLiked(!liked);
    await dispatch(likePost(postId));
    if (isAccount) {
      dispatch(getMyPosts());
    } else {
      dispatch(postsOfFollowingUser());
    }
  };

  const CommentHandler = async (e) => {
    e.preventDefault();
    await dispatch(AddComment(postId, commentValue));
    if (isAccount) {
    } else {
      dispatch(postsOfFollowingUser());
    }
  };

  useEffect(() => {
    likes.forEach((item) => {
      if (item._id === user._id) {
        return setLiked(true);
      }
    });
  }, [user._id, likes]);

  const updateCaptionHandler = async (e) => {
    e.preventDefault();
    await dispatch(updatePost(postId, captionValue));
    dispatch(getMyPosts());
  };

  const DeletePostHandler = async () => {
    await dispatch(deletePost(postId));
    dispatch(getMyPosts());
    dispatch(loadUser());
  };

  return (
    <div className="post">
      <div className="postHeader">
        {isAccount ? (
          <Button
            onClick={() => {
              setCaptionTogglet(!captionToggle);
            }}
          >
            <MoreVert />
          </Button>
        ) : null}
      </div>
      <img src={postImage} alt="Post" />
      <div className="postDetails">
        <Avatar
          src={ownerImage}
          alt="User"
          sx={{ height: "3vmax", width: "3vmax" }}
        />
        <Link to={`/user/${ownerId}`}>
          <Typography fontWeight={700}>{ownerName}</Typography>
        </Link>
        <Typography
          fontWeight={400}
          color={"rgba(0,0,0,0.582)"}
          style={{ alignSelf: "center" }}
        >
          {caption}
        </Typography>
      </div>
      <button
        onClick={() => setPostLikes(!postLikes)}
        disabled={likes.length === 0 ? true : false}
        style={{
          border: "none",
          backgroundColor: "white",
          cursor: "pointer",
          margin: "1vmax 2vmax",
        }}
      >
        <Typography>{likes.length} Likes</Typography>
      </button>
      <div className="postFooter">
        <Button onClick={() => handleLike(postId)}>
          {liked && liked ? (
            <Favorite style={{ color: "red" }} />
          ) : (
            <FavoriteBorder />
          )}
        </Button>
        <Button onClick={() => setPostComment(!postComment)}>
          <ChatBubbleOutline />
        </Button>
        {isDelete ? (
          <Button onClick={DeletePostHandler}>
            <DeleteOutline />
          </Button>
        ) : null}
      </div>

      <Dialog onClose={() => setPostLikes(!postLikes)} open={postLikes}>
        <div className="DialogBox">
          <Typography variant="h4">Liked By</Typography>

          {likes && likes.length > 0 ? (
            likes.map((user) => (
              <User
                key={user._id}
                userId={user._id}
                name={user.name}
                avatar={user.avatar.url}
              />
            ))
          ) : (
            <Typography>No Likes Yet</Typography>
          )}
        </div>
      </Dialog>

      <Dialog onClose={() => setPostComment(!postComment)} open={postComment}>
        <div className="DialogBox">
          <Typography variant="h4">Comments</Typography>

          <form className="commentForm" onSubmit={CommentHandler}>
            <input
              onChange={(e) => setCommentValue(e.target.value)}
              type="text"
              value={commentValue}
              placeholder="Comment Here.."
              required
            />
            <Button variant="contained" type="submit">
              Add
            </Button>
          </form>
          {comments && comments.length > 0 ? (
            comments.map((comment) => (
              // <User
              //   key={comment._id}
              //   userId={comment.user._id}
              //   name={comment.comment}
              //   avatar={comment.user.avatar.url}
              // />
              <CommentCard
                key={comment._id}
                userId={comment.user._id}
                name={comment.user.name}
                avatar={comment.user.avatar.url}
                comment={comment.comment}
                commentId={comment._id}
                postId={postId}
                isAccount={isAccount}
              />
            ))
          ) : (
            <Typography style={{ textAlign: "center" }}>
              No Comments Yet
            </Typography>
          )}
        </div>
      </Dialog>

      <Dialog
        onClose={() => setCaptionTogglet(!captionToggle)}
        open={captionToggle}
      >
        <div className="DialogBox">
          <Typography variant="h4">Update Caption</Typography>

          <form
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "70vh",
              gap: "5vmax",
              minWidth: "250px",
            }}
            className="commentForm"
            onSubmit={updateCaptionHandler}
          >
            <input
              onChange={(e) => setCaptionValue(e.target.value)}
              type="text"
              placeholder="Caption Here.."
              value={captionValue}
              required
            />
            <Button variant="contained" type="submit">
              Update
            </Button>
          </form>
        </div>
      </Dialog>
    </div>
  );
};

export default Post;

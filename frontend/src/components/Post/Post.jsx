import React, { useEffect, useState } from "react";
import "./Post.css";
import {
  MoreVert,
  Favorite,
  FavoriteBorder,
  ChatBubbleOutline,
} from "@mui/icons-material";
import {
  Avatar,
  Button,
  Typography,
  Dialog,
  Menu,
  MenuItem,
} from "@mui/material";
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

  const [anchorEl, setAnchorEl] = useState(false);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="post" style={{ margin: "1vmax 1vmax" }}>
      <div className="postDetails">
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar
            src={ownerImage}
            alt="User"
            sx={{ height: "4vmax", width: "4vmax" }}
            className="PostAvatar"
          />
          <Link to={`/user/${ownerId}`}>
            <Typography fontWeight={700}>{ownerName}</Typography>
          </Link>
        </div>
        {isAccount ? (
          // <Button
          //   style={{ justifySelf: "flex-end" }}
          //   onClick={() => {
          //     setCaptionTogglet(!captionToggle);
          //   }}
          // >
          //   <MoreVert />
          // </Button>
          <>
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              style={{
                color: "blue",
              }}
            >
              <MoreVert style={{ fontSize: "2rem" }} />
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem
                onClick={async () => {
                  await handleClose();
                  setCaptionTogglet(!captionToggle);
                }}
              >
                {" "}
                Edit Caption{" "}
              </MenuItem>

              {isDelete ? (
                <MenuItem
                  style={{ color: "red" }}
                  onClick={async () => {
                    await handleClose();
                    DeletePostHandler();
                  }}
                >
                  {" "}
                  Delete Post{" "}
                </MenuItem>
              ) : null}
            </Menu>
          </>
        ) : null}
      </div>
      <p className="PostCaption">{caption}</p>
      <img sty src={postImage} alt="Post" />
      <hr />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
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
        <button
          style={{
            border: "none",
            backgroundColor: "white",
            cursor: "pointer",
            margin: "1vmax 2vmax",
          }}
        >
          <Typography>{comments.length} Comments</Typography>
        </button>
      </div>

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
        <div
          className="DialogBox"
          style={{
            minWidth: window.innerWidth > 600 ? "500px" : `400px`,
          }}
        >
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

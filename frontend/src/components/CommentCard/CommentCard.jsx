import React from "react";
import "./CommentCard.css";
import { Link } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment } from "../../redux/actions/postAction";
import { postsOfFollowingUser } from "../../redux/actions/userAction";

const CommentCard = ({
  userId,
  name,
  avatar,
  comment,
  commentId,
  postId,
  isAccount,
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const deleteCommentHandler = async () => {
    await dispatch(deleteComment(postId, commentId));
    if (isAccount) {
    } else {
      dispatch(postsOfFollowingUser());
    }
  };
  return (
    <div className="commentUser" style={{ justifyContent: "space-between" }}>
      <Link className="linkds" to={`/user/${userId}`}>
        <img src={avatar} alt={name} />
        <Typography style={{ minWidth: "6vmax" }}>{name}</Typography>
      </Link>
      <Typography style={{ marginLeft: "10px" }}>{comment}</Typography>

      {isAccount && isAccount ? (
        <Button onClick={deleteCommentHandler}>
          <Delete />
        </Button>
      ) : user._id === userId ? (
        <Button style={{ marginLeft: "auto" }} onClick={deleteCommentHandler}>
          <Delete />
        </Button>
      ) : null}
    </div>
  );
};

export default CommentCard;

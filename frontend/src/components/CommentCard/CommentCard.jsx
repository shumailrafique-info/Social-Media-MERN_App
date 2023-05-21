import React, { useState } from "react";
import "./CommentCard.css";
import { Link } from "react-router-dom";
import { Button, Menu, MenuItem, Typography } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
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

  //edit Post Button Logic
  const [anchorEl, setAnchorEl] = useState(false);
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <div className="commentUser" style={{ justifyContent: "space-between" }}>
      <Link className="links" to={`/user/${userId}`}>
        <img src={avatar} alt={name} />
        <Typography style={{ minWidth: "6vmax" }}>{name}</Typography>
      </Link>
      {isAccount && isAccount ? (
        <>
          {/* <Button onClick={deleteCommentHandler}>
            <Delete />
          </Button> */}
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            style={{
              position: "absolute",
              top: "5px",
              right: "5px",
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
              style={{ color: "red" }}
              onClick={async () => {
                await handleClose();
                deleteCommentHandler();
              }}
            >
              {" "}
              Delete{" "}
            </MenuItem>
          </Menu>
        </>
      ) : user._id === userId ? (
        <>
          {/* <Button style={{ marginLeft: "auto" }} onClick={deleteCommentHandler}>
            <Delete />
          </Button> */}
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            style={{
              position: "absolute",
              color: "blue",
              top: "5px",
              right: "5px",
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
              style={{ color: "red" }}
              onClick={async () => {
                await handleClose();
                deleteCommentHandler();
              }}
            >
              {" "}
              Delete{" "}
            </MenuItem>
          </Menu>
        </>
      ) : null}
      <Typography className="commentOfUser">{comment}</Typography>
    </div>
  );
};

export default CommentCard;

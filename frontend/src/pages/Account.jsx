import React, { Fragment, useEffect, useRef, useState } from "react";
import "./Account.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addCoverpicture,
  deleteProfile,
  getMyPosts,
} from "../redux/actions/postAction";
import { useAlert } from "react-alert";
import Loader from "../components/Loader/Loader";
import Post from "../components/Post/Post";
import { Avatar, Button, Dialog, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import User from "../components/User/User";
import { loadUser, logoutUser } from "../redux/actions/userAction";
import { MoreVert } from "@mui/icons-material";
import { Menu } from "@mui/material";
import { MenuItem } from "@mui/material";

const Account = () => {
  const dispatch = useDispatch();
  const Alert = useAlert();
  const coverImageInput = useRef();

  const { loading, error, posts } = useSelector((state) => state.myPosts);
  const { error: LikeError, message } = useSelector((state) => state.like);
  const { user, loading: userLoading } = useSelector((state) => state.user);

  const [followingToggle, setFollowingToggle] = useState(false);
  const [followersToggle, setFollowersToggle] = useState(false);

  useEffect(() => {
    dispatch(getMyPosts());
    if (message) {
      Alert.success(message);
      dispatch({ type: "ClearMessageLike" });
    }
    if (LikeError) {
      Alert.error(LikeError);
      dispatch({ type: "ClearErrorsLike" });
    }
    if (error) {
      Alert.error(error);
      dispatch({ type: "ClearErrorsPOF" });
    }
  }, [dispatch, error, Alert, LikeError, message]);

  const [anchorEl, setAnchorEl] = useState(false);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickonChangeImage = () => {
    handleClose();
    coverImageInput.current.click();
  };

  return (
    <Fragment>
      {(loading && loading === true) || userLoading === true ? (
        <Loader />
      ) : (
        <div className="account">
          <div className="accountleft">
            {posts && posts.length > 0 ? (
              posts.map((item) => (
                <Post
                  key={item._id}
                  postId={item._id}
                  caption={item.caption}
                  likes={item.likes}
                  comments={item.comments}
                  ownerImage={item.owner.avatar.url}
                  ownerName={item.owner.name}
                  ownerId={item.owner._id}
                  isDelete={true}
                  isAccount={true}
                  postImage={item.image.url}
                />
              ))
            ) : (
              <Typography variant="h6">No Posts yet</Typography>
            )}
          </div>
          <div className="accountright">
            {/* Settings */}
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              style={{
                marginLeft: "auto",
                position: "absolute",
                color: "blue",
                top: "2vmax",
                right: "2vmax",
              }}
            >
              <MoreVert style={{ fontSize: "2.5rem" }} />
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
              <Link
                onClick={handleClose}
                style={{ color: "black", textDecoration: "none" }}
                to={"/update/profile"}
              >
                <MenuItem>Edit Profile</MenuItem>
              </Link>

              <Link
                onClick={handleClose}
                style={{ color: "black", textDecoration: "none" }}
                to={"/update/password"}
              >
                <MenuItem>Change Password</MenuItem>
              </Link>

              <Link
                onClick={handleClickonChangeImage}
                style={{ color: "black", textDecoration: "none" }}
              >
                <MenuItem>Change cover Image</MenuItem>
              </Link>

              <MenuItem
                onClick={async () => {
                  handleClose();
                  await dispatch(deleteProfile());
                  dispatch(logoutUser());
                }}
                style={{ color: "red" }}
                disabled={LikeError}
              >
                Delete My Profile
              </MenuItem>
              <MenuItem
                style={{ color: "black" }}
                onClick={async () => {
                  await dispatch(logoutUser());
                  Alert.success("Logged out");
                  handleClose();
                }}
              >
                Logout
              </MenuItem>
            </Menu>

            {/* Settings */}
            <div
              style={{
                width: "100vw",
                maxWidth: "100%",
                height: "280px",
                backgroundColor: "blue",
                position: "absolute",
                top: "0px",
                zIndex: "-1",
                backgroundImage: user.coverImage
                  ? `url(${user.coverImage.url})`
                  : `url(${user.avatar.url})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            ></div>
            <input
              type="file"
              accept="image/*"
              onChange={async (e) => {
                console.log(e.target.files[0]);
                Alert.success("Updating..")
                await dispatch(addCoverpicture(e.target.files[0]));
                dispatch(loadUser());
              }}
              ref={coverImageInput}
              hidden={true}
            />
            <Avatar
              className="HoverAnimation"
              src={user.avatar.url}
              alt={user.name}
            />
            <Typography variant={"h5"}>{user.name}</Typography>
            <div className="rightDiv">
              <div>
                <button onClick={() => setFollowersToggle(!followersToggle)}>
                  <Typography>Followers</Typography>
                </button>
                <Typography>{user.followers.length}</Typography>
              </div>
              <div>
                <button onClick={() => setFollowingToggle(!followingToggle)}>
                  <Typography>following</Typography>
                </button>
                <Typography>{user.following.length}</Typography>
              </div>
              <div>
                <button style={{ width: "90px" }}>
                  <Typography>Posts</Typography>
                </button>

                <Typography>{user.posts.length}</Typography>
              </div>
            </div>
            {/* Following Dialog Box */}
            <Dialog
              onClose={() => setFollowingToggle(!followingToggle)}
              open={followingToggle}
            >
              <div className="DialogBox" style={{ minWidth: "380px" }}>
                <Typography variant="h4">Fllowing</Typography>
                {user && user.following.length > 0 ? (
                  user.following.map((user) => (
                    <User
                      key={user._id}
                      userId={user._id}
                      name={user.name}
                      avatar={user.avatar.url}
                    />
                  ))
                ) : (
                  <Typography>No Following Yet</Typography>
                )}
              </div>
            </Dialog>
            {/* Followers Dialog Box */}
            <Dialog
              onClose={() => setFollowersToggle(!followersToggle)}
              open={followersToggle}
            >
              <div className="DialogBox" style={{ minWidth: "380px" }}>
                <Typography variant="h4">Followers</Typography>
                {user && user.followers.length > 0 ? (
                  user.followers.map((user) => (
                    <User
                      key={user._id}
                      userId={user._id}
                      name={user.name}
                      avatar={user.avatar.url}
                    />
                  ))
                ) : (
                  <Typography>No Follers Yet</Typography>
                )}
              </div>
            </Dialog>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Account;

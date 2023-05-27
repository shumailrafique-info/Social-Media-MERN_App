import { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import Post from "../Post/Post";
import {
  Avatar,
  Button,
  Dialog,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import User from "../User/User";
import { getSingleUser, logoutUser } from "../../redux/actions/userAction";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MoreVert } from "@mui/icons-material";
import { deleteProfile, followUser } from "../../redux/actions/postAction";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";

const Userprofile = () => {
  const dispatch = useDispatch();
  const Alert = useAlert();
  const { id } = useParams();
  const Navigate = useNavigate();

  const {
    loading,
    error,
    user: thisUser,
  } = useSelector((state) => state.singleUser);
  const {
    error: LikeError,
    message,
    loading: likeloading,
  } = useSelector((state) => state.like);
  const { user, loading: userLoading } = useSelector((state) => state.user);

  const [followingToggle, setFollowingToggle] = useState(false);
  const [followersToggle, setFollowersToggle] = useState(false);
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    setFollowingToggle(false);
    setFollowersToggle(false);
    dispatch(getSingleUser(id));

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
  }, [dispatch, error, Alert, LikeError, message, id]);

  useEffect(() => {
    if (thisUser) {
      setFollowing(false);
      thisUser.followers.forEach((item) => {
        if (item._id === user._id) {
          setFollowing(true);
        } else {
        }
      });
    }
  }, [thisUser, user._id]);

  const followHandler = async () => {
    await dispatch(followUser(id));
    setFollowing(!following);
  };

  const [anchorEl, setAnchorEl] = useState(false);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = async () => {
    //check wether the group exists
    const combinedId =
      user._id > thisUser._id
        ? user._id + thisUser._id
        : thisUser._id + user._id;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      if (!res.exists()) {
        console.log("not exists");
        //create Chat
        await setDoc(doc(db, "chats", combinedId), { messages: [] });
        //user chats
        // To update age and favorite color:
        await updateDoc(doc(db, "userChats", user._id), {
          [combinedId + ".userInfo"]: {
            _id: thisUser._id,
            name: thisUser.name,
            avatar: thisUser.avatar.url,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        //Same for Other user
        await setDoc(doc(db, "chats", combinedId), { messages: [] });
        //user chats
        // To update age and favorite color:
        await updateDoc(doc(db, "userChats", thisUser._id), {
          [combinedId + ".userInfo"]: {
            _id: user._id,
            name: user.name,
            avatar: user.avatar.url,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
      dispatch({
        type: "changeUser",
        payload: {
          user: {
            _id: thisUser._id,
            name: thisUser.name,
            avatar: thisUser.avatar.url,
          },
          ChatId:
            user._id > thisUser._id
              ? user._id + thisUser._id
              : thisUser._id + user._id,
        },
      });
      Navigate(`/user/chats/${user._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      {(loading && loading === true) || userLoading === true ? (
        <Loader />
      ) : (
        <div className="account">
          <div className="accountleft">
            {thisUser && thisUser.posts.length > 0 ? (
              thisUser.posts.map((item) => (
                <Post
                  key={item._id}
                  postId={item._id}
                  caption={item.caption}
                  likes={item.likes}
                  comments={item.comments}
                  ownerImage={item.owner.avatar.url}
                  ownerName={item.owner.name}
                  ownerId={item.owner._id}
                  isDelete={user._id === thisUser._id ? true : false}
                  isAccount={user._id === thisUser._id ? true : false}
                  postImage={item.image.url}
                />
              ))
            ) : (
              <Typography variant="h6">User has not made any post</Typography>
            )}
          </div>
          <div className="accountright">
            <div
              className="CoverPicDiv"
              style={{
                backgroundImage:
                  thisUser && thisUser.coverImage
                    ? `url(${thisUser && thisUser.coverImage.url})`
                    : `url(${thisUser && thisUser.avatar.url})`,
              }}
            ></div>
            {/* Settings */}

            {thisUser && user._id === thisUser._id ? (
              <>
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
              </>
            ) : (
              ""
            )}

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

            <Avatar
              className="HoverAnimation"
              style={{ height: "8vmax", width: "8vmax" }}
              src={thisUser && thisUser.avatar.url}
              alt={thisUser && thisUser.name}
            />
            <Typography variant={"h5"}>{thisUser && thisUser.name}</Typography>
            <div className="rightDiv">
              <div>
                <button onClick={() => setFollowersToggle(!followersToggle)}>
                  <Typography>Followers</Typography>
                </button>
                <Typography>{thisUser && thisUser.followers.length}</Typography>
              </div>
              <div>
                <button onClick={() => setFollowingToggle(!followingToggle)}>
                  <Typography>following</Typography>
                </button>
                <Typography>{thisUser && thisUser.following.length}</Typography>
              </div>
              <div>
                <button style={{ width: "90px" }}>
                  <Typography>Posts</Typography>
                </button>

                <Typography>{thisUser && thisUser.posts.length}</Typography>
              </div>
            </div>
            <div style={{ display: "flex", gap: "2vmax" }}>
              <Button
                style={{
                  width: "100%",
                  minWidth: "150px",
                  backgroundColor: following ? "red" : "blue",
                  display:
                    thisUser && user._id === thisUser._id ? "none" : "block",
                }}
                variant="contained"
                onClick={followHandler}
                disabled={likeloading}
              >
                {following ? "Unfollow" : "Follow"}
              </Button>
              <Button
                onClick={handleSelect}
                style={{
                  width: "100%",
                  minWidth: "150px",
                  backgroundColor: "blue",
                  display:
                    thisUser && user._id === thisUser._id ? "none" : "block",
                }}
                variant="contained"
                // disabled={true}
              >
                Message
              </Button>
            </div>
            {/* Following Dialog Box */}
            <Dialog
              onClose={() => setFollowingToggle(!followingToggle)}
              open={followingToggle}
            >
              <div className="DialogBox" style={{ minWidth: "380px" }}>
                <Typography variant="h4">Fllowing</Typography>
                {thisUser && thisUser.following.length > 0 ? (
                  thisUser.following.map((user) => (
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
                {thisUser && thisUser.followers.length > 0 ? (
                  thisUser.followers.map((user) => (
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

export default Userprofile;

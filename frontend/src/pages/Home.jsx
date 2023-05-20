import React, { Fragment, useEffect } from "react";
import "./Home.css";
import User from "../components/User/User";
import Post from "../components/Post/Post";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, postsOfFollowingUser } from "../redux/actions/userAction";
import Loader from "../components/Loader/Loader";
import { Typography } from "@mui/material";
import { useAlert } from "react-alert";

const Home = () => {
  const dispatch = useDispatch();

  const Alert = useAlert();
  const { error: LikeError, message } = useSelector((state) => state.like);

  const { posts, loading, error } = useSelector(
    (state) => state.postsOfFollowing
  );
  const {
    users,
    loading: allUserLoading,
    error: allUserError,
  } = useSelector((state) => state.allUsers);

  useEffect(() => {
    dispatch(postsOfFollowingUser());
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
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
    if (allUserError) {
      Alert.error(allUserError);
      dispatch({ type: "ClearErrorsAUR" });
    }
  }, [dispatch, LikeError, message, Alert, error, allUserError]);

  return (
    <Fragment>
      {loading === true || allUserLoading === true ? (
        <Loader />
      ) : (
        <div className="home">
          <div className="homeleft">
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
                  isDelete={false}
                  isAccount={false}
                  postImage={item.image.url}
                />
              ))
            ) : (
              <Typography variant="h6">No Posts yet</Typography>
            )}
          </div>
          <div className="homeright">
            <Typography variant="h5">All Users</Typography>
            {users && users.length > 0 ? (
              users.map((user) => (
                <User
                  key={user._id}
                  userId={user._id}
                  name={user.name}
                  avatar={user.avatar.url}
                />
              ))
            ) : (
              <Typography>No Users Yet</Typography>
            )}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Home;

import { configureStore } from "@reduxjs/toolkit";
import {
  allUsersReducer,
  postOfFollowingReducer,
  userReducer,
} from "./reducers/userReducer";
import { getMyPosts, likePostReducer } from "./reducers/postReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    postsOfFollowing: postOfFollowingReducer,
    allUsers: allUsersReducer,
    like: likePostReducer,
    myPosts: getMyPosts,
  },
});

export default store;

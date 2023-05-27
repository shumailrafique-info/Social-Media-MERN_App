import { configureStore } from "@reduxjs/toolkit";
import {
  allUsersReducer,
  getSingleUser,
  postOfFollowingReducer,
  userChatReducer,
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
    singleUser: getSingleUser,
    userChat: userChatReducer,
  },
});

export default store;

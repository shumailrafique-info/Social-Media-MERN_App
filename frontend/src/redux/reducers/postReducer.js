import { createReducer } from "@reduxjs/toolkit";

export const likePostReducer = createReducer(
  {},
  {
    likePostRequest: (state, action) => {
      state.loading = true;
    },
    likePostSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    likePostFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    ClearErrorsLike: (state, action) => {
      state.error = null;
    },
    ClearMessageLike: (state, action) => {
      state.message = null;
    },

    //Adding Comment Reducer
    AddCommentRequest: (state, action) => {
      state.loading = true;
    },
    AddCommentSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    AddCommentFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //Adding Post Reducer
    NewPostRequest: (state, action) => {
      state.loading = true;
    },
    NewPostSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    NewPostFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //Update Post Reducer
    updatePostRequest: (state, action) => {
      state.loading = true;
    },
    updatePostSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    updatePostFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //delete Post Reducer
    deletePostRequest: (state, action) => {
      state.loading = true;
    },
    deletePostSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    deletePostFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //Deleting Comment Reducer
    DeleteCommentRequest: (state, action) => {
      state.loading = true;
    },
    DeleteCommentSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    DeleteCommentFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //Deleting Profile Reducer
    DeleteProfileRequest: (state, action) => {
      state.loading = true;
    },
    DeleteProfileSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    DeleteProfileFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //Update User Reducer
    updateProfileRequest: (state, action) => {
      state.loading = true;
    },
    updateProfileSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    updateProfileFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //Update Password Reducer
    updatePasswordRequest: (state, action) => {
      state.loading = true;
    },
    updatePasswordSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    updatePasswordFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //Forgot Password Reducer
    forgotPasswordRequest: (state, action) => {
      state.loading = true;
    },
    forgotPasswordSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    forgotPasswordFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //Reset Password Reducer
    resetPasswordRequest: (state, action) => {
      state.loading = true;
    },
    resetPasswordSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    resetPasswordFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //follow user Reducer
    followUserRequest: (state, action) => {
      state.loading = true;
    },
    followUserSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    followUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //Add user Cpver pic Reducer
    updateCoverPicRequest: (state, action) => {
      state.loading = true;
    },
    updateCoverPicSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    updateCoverPicFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  }
);

export const getMyPosts = createReducer(
  {},
  {
    myPostsRequest: (state, action) => {
      state.loading = true;
    },
    myPostsSuccess: (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    },
    myPostsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    myPostsClearError: (state, action) => {
      state.error = null;
    },
  }
);

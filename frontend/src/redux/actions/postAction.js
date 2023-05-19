import axios from "axios";

export const likePost = (id) => async (dispatch) => {
  try {
    dispatch({ type: "likePostRequest" });

    const { data } = await axios.get(`/api/v1/post/${id}`);
    dispatch({ type: "likePostSuccess", payload: data.message });
  } catch (error) {
    dispatch({ type: "likePostFailure", payload: error.response.data.message });
  }
};

export const AddComment = (id, comment) => async (dispatch) => {
  try {
    dispatch({ type: "AddCommentRequest" });

    const { data } = await axios.put(
      `/api/v1/post/comment/${id}`,
      { comment },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch({ type: "AddCommentSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "AddCommentFailure",
      payload: error.response.data.message,
    });
  }
};

export const deleteComment = (postID, commentId) => async (dispatch) => {
  try {
    dispatch({ type: "DeleteCommentRequest" });

    const { data } = await axios.delete(
      `/api/v1/post/comment/${postID}`,
      { data: { commentId } },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch({ type: "DeleteCommentSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "DeleteCommentFailure",
      payload: error.response.data.message,
    });
  }
};

export const getMyPosts = () => async (dispatch) => {
  try {
    dispatch({ type: "myPostsRequest" });

    const { data } = await axios.get(`/api/v1/users/myposts`);
    dispatch({ type: "myPostsSuccess", payload: data.posts });
  } catch (error) {
    dispatch({
      type: "myPostsFailure",
      payload: error.response.data.message,
    });
  }
};

export const addPost = (image, caption) => async (dispatch) => {
  try {
    dispatch({ type: "NewPostRequest" });

    const { data } = await axios.post(
      `/api/v1/post/new/upload`,
      { file: image, caption },
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch({ type: "NewPostSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "NewPostFailure",
      payload: error.response.data.message,
    });
  }
};

export const updatePost = (postId, caption) => async (dispatch) => {
  try {
    dispatch({ type: "updatePostRequest" });

    const { data } = await axios.put(`/api/v1/post/${postId}`, { caption });
    dispatch({ type: "updatePostSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "updatePostFailure",
      payload: error.response.data.message,
    });
  }
};
export const deletePost = (postId) => async (dispatch) => {
  try {
    dispatch({ type: "deletePostRequest" });

    const { data } = await axios.delete(`/api/v1/post/${postId}`);
    dispatch({ type: "deletePostSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "deletePostFailure",
      payload: error.response.data.message,
    });
  }
};
export const deleteProfile = () => async (dispatch) => {
  try {
    dispatch({ type: "DeleteProfileRequest" });

    const { data } = await axios.delete(`/api/v1/users/delete/profile`);
    dispatch({ type: "DeleteProfileSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "DeleteProfileFailure",
      payload: error.response.data.message,
    });
  }
};

export const updateProfile = (name, email, avatar) => async (dispatch) => {
  try {
    dispatch({ type: "updateProfileRequest" });
    const { data } = await axios.put(
      `/api/v1/users/update/profile`,
      { name, email, avatar },
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch({ type: "updateProfileSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "updateProfileFailure",
      payload: error.response.data.message,
    });
  }
};

export const updatePassword =
  (oldPassword, newPassword, confirmPassword) => async (dispatch) => {
    try {
      dispatch({ type: "updatePasswordRequest" });
      const { data } = await axios.put(
        `/api/v1/users/update/password`,
        { oldPassword, newPassword, confirmPassword },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      dispatch({ type: "updatePasswordSuccess", payload: data.message });
    } catch (error) {
      dispatch({
        type: "updatePasswordFailure",
        payload: error.response.data.message,
      });
    }
  };

export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: "forgotPasswordRequest" });
    const { data } = await axios.get(`/api/v1/users/forgot/password/${email}`);
    dispatch({ type: "forgotPasswordSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "forgotPasswordFailure",
      payload: error.response.data.message,
    });
  }
};

export const resetPassword =
  (resetPasswordToken, password) => async (dispatch) => {
    try {
      dispatch({ type: "resetPasswordRequest" });
      const { data } = await axios.put(
        `/api/v1/users/password/reset/${resetPasswordToken}`,
        {
          password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      dispatch({ type: "resetPasswordSuccess", payload: data.message });
    } catch (error) {
      dispatch({
        type: "resetPasswordFailure",
        payload: error.response.data.message,
      });
    }
  };

import axios from "axios";

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: "LoginRequest" });

    const { data } = await axios.post(
      "/api/v1/users/login",
      {
        email,
        password,
      },
      { headers: { "Content-Type": "application/json" } }
    );
    dispatch({ type: "LoginSuccess", payload: data.user });
  } catch (error) {
    dispatch({ type: "LoginFailure", payload: error.response.data.message });
  }
};

export const registerUser =
  (name, email, password, avatar) => async (dispatch) => {
    try {
      dispatch({ type: "RegisterRequest" });

      const { data } = await axios.post(
        "/api/v1/users/register",
        { name, email, password, avatar },
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      dispatch({ type: "RegisterSuccess", payload: data.user });
    } catch (error) {
      dispatch({
        type: "RegisterFailure",
        payload: error.response.data.message,
      });
    }
  };

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: "LoadUserRequest" });

    const { data } = await axios.get("/api/v1/users/profile");
    dispatch({ type: "LoadUserSuccess", payload: data.user });
  } catch (error) {
    dispatch({ type: "LoadUserFailure", payload: error.response.data.message });
  }
};

export const getAllUsers = (name) => async (dispatch) => {
  try {
    dispatch({ type: "allUsersRequest" });

    const { data } = await axios.get(`/api/v1/users/all?name=${name}`);
    dispatch({ type: "allUsersSuccess", payload: data.users });
  } catch (error) {
    dispatch({ type: "allUsersFailure", payload: error.response.data.message });
  }
};

export const postsOfFollowingUser = () => async (dispatch) => {
  try {
    dispatch({ type: "PostOfFollowingRequest" });

    const { data } = await axios.get("/api/v1/post/following/posts");
    dispatch({ type: "PostOfFollowingSuccess", payload: data.posts });
  } catch (error) {
    dispatch({
      type: "PostOfFollowingFailure",
      payload: error.response.data.message,
    });
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    dispatch({ type: "LogoutUserRequest" });

    await axios.get("/api/v1/users/logout");
    dispatch({ type: "LogoutUserSuccess" });
  } catch (error) {
    dispatch({
      type: "LogoutUserFailure",
      payload: error.response.data.message,
    });
  }
};

export const getSingleUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: "getSingleUserRequest" });

    const { data } = await axios.get(`/api/v1/users/any/${id}`);
    dispatch({ type: "getSingleUserSuccess", payload: data.user });
  } catch (error) {
    dispatch({
      type: "getSingleUserFailure",
      payload: error.response.data.message,
    });
  }
};

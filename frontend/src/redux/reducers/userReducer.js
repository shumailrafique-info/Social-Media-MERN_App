import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
};

export const userReducer = createReducer(initialState, {
  //Login User
  LoginRequest: (state, action) => {
    state.loading = true;
  },
  LoginSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.isAuthenticated = true;
  },
  LoginFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  },
  ClearErrors: (state, action) => {
    state.error = null;
  },

  //Register User
  RegisterRequest: (state, action) => {
    state.loading = true;
  },
  RegisterSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.isAuthenticated = true;
  },
  RegisterFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  },

  //Load User
  LoadUserRequest: (state, action) => {
    state.loading = true;
  },
  LoadUserSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.isAuthenticated = true;
  },
  LoadUserFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  },
  //Logout User
  LogoutUserRequest: (state, action) => {
    state.loading = true;
  },
  LogoutUserSuccess: (state, action) => {
    state.loading = false;
    state.user = null;
    state.isAuthenticated = false;
  },
  LogoutUserFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = true;
  },
  ClearErrorsLU: (state, action) => {
    state.error = null;
  },
});

export const postOfFollowingReducer = createReducer(
  {},
  {
    PostOfFollowingRequest: (state, action) => {
      state.loading = true;
    },
    PostOfFollowingSuccess: (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    },
    PostOfFollowingFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    ClearErrorsPOF: (state, action) => {
      state.error = null;
    },
  }
);
export const getSingleUser = createReducer(
  {},
  {
    getSingleUserRequest: (state, action) => {
      state.loading = true;
    },
    getSingleUserSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    getSingleUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    ClearErrorsGSU: (state, action) => {
      state.error = null;
    },
  }
);

export const allUsersReducer = createReducer(
  {},
  {
    allUsersRequest: (state, action) => {
      state.loading = true;
    },
    allUsersSuccess: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    allUsersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    ClearErrorsAUR: (state, action) => {
      state.error = null;
    },
  }
);

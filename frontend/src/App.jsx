import { Fragment, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header/Header.jsx";
import Login from "./components/Login/Login.jsx";
import Register from "./components/Register/Register.jsx";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./redux/actions/userAction";
import Account from "./pages/Account";
import Addfriends from "./pages/Addfriends.jsx";
import NewPost from "./components/NewPost/NewPost";
import UpdateProfile from "./components/UpdateProfile/UpdateProfile";
import UpdatePassword from "./components/UpdatePassword/UpdatePassword.jsx";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import ResetPassword from "./components/ResetPassword/ResetPassword";

function App() {
  const { isAuthenticated } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Fragment>
      <BrowserRouter>
        {isAuthenticated && <Header />}

        <Routes>
          <Route
            path="/"
            element={isAuthenticated && isAuthenticated ? <Home /> : <Login />}
          />
          <Route
            path="/account"
            element={
              isAuthenticated && isAuthenticated ? <Account /> : <Login />
            }
          />
          <Route
            path="/addfriends"
            element={
              isAuthenticated && isAuthenticated ? <Addfriends /> : <Login />
            }
          />
          <Route
            path="/newpost"
            element={
              isAuthenticated && isAuthenticated ? <NewPost /> : <Login />
            }
          />
          <Route
            path="/register"
            element={
              isAuthenticated && isAuthenticated ? <Account /> : <Register />
            }
          />
          <Route
            path="/update/profile"
            element={
              isAuthenticated && isAuthenticated ? (
                <UpdateProfile />
              ) : (
                <Register />
              )
            }
          />
          <Route
            path="/update/password"
            element={
              isAuthenticated && isAuthenticated ? (
                <UpdatePassword />
              ) : (
                <Register />
              )
            }
          />
          <Route path="/forgot/password" element={<ForgotPassword />} />
          <Route
            path="/api/v1/users/password/reset/:resetPasswordToken"
            element={<ResetPassword />}
          />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;

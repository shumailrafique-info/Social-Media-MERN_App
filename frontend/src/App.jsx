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
import Userprofile from "./components/UserProfile/Userprofile";
import NotFound from "./components/NotFound/NotFound.jsx";
import Info from "./components/Info/Info.jsx";

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
              isAuthenticated && isAuthenticated ? <UpdateProfile /> : <Login />
            }
          />
          <Route
            path="/user/:id"
            element={
              isAuthenticated && isAuthenticated ? <Userprofile /> : <Login />
            }
          />
          <Route
            path="/update/password"
            element={
              isAuthenticated && isAuthenticated ? (
                <UpdatePassword />
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="/forgot/password"
            element={
              isAuthenticated && isAuthenticated ? (
                <UpdatePassword />
              ) : (
                <ForgotPassword />
              )
            }
          />
          <Route
            path="/api/v1/users/password/reset/:resetPasswordToken"
            element={
              isAuthenticated && isAuthenticated ? (
                <Account />
              ) : (
                <ResetPassword />
              )
            }
          />
          <Route
            path="/created/by"
            element={<Info/>}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;

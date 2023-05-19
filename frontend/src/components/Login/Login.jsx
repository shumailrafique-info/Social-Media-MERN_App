import React, { Fragment, useEffect, useState } from "react";
import { Button } from "@mui/material";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loginUser } from "../../redux/actions/userAction";
import { useAlert } from "react-alert";

const Login = () => {
  const dispatch = useDispatch();
  const Alert = useAlert();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  //   const { isAuthenticated } = useSelector((state) => state.user);

  const { error, loading } = useSelector((state) => state.user);

  const SubmitHandler = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
  };
  useEffect(() => {
    if (error === "Please login first") {
      return;
    }
    if (error) {
      Alert.error(error);
      dispatch({ type: "ClearErrorsLU" });
    }
  }, [error, Alert, dispatch]);

  return (
    <Fragment>
      <div className="login-form-container">
        <form onSubmit={(e) => SubmitHandler(e)}>
          <h1
            style={{
              marginBottom: "20px",
              borderBottom: "3px solid rgb(225, 90, 41)",
              width: "30%",
              textAlign: "center",
              paddingBottom: "1vmax",
            }}
          >
            Login
          </h1>
          <input
            type="email"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <Link to={"/forgot/password"}>forgot password?</Link>
          <Button disabled={loading} type="submit">
            Login
          </Button>
          <Link to={"/register"}>new user?</Link>
        </form>
      </div>
    </Fragment>
  );
};

export default Login;

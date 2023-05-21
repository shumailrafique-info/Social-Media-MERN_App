import React, { Fragment, useEffect, useRef, useState } from "react";
import { Avatar, Button } from "@mui/material";
import "./Register.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { registerUser } from "../../redux/actions/userAction";
import { useAlert } from "react-alert";

const Register = () => {
  const dispatch = useDispatch();
  const Alert = useAlert();
  const myRefname = useRef(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState();
  const [avatarprev, setAvatarprev] = useState("");

  const { error, loading } = useSelector((state) => state.user);

  const SubmitHandler = (e) => {
    e.preventDefault();
    dispatch(registerUser(name, email, password, avatar));
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

  const handleClick = () => {
    myRefname.current.click();
  };

  return (
    <Fragment>
      <div className="register-form-container">
        <div className="login-absolute-1"></div>
        <div className="login-absolute-2"></div>
        <div className="login-absolute-3"></div>
        <div className="login-absolute-4"></div>
        <form onSubmit={(e) => SubmitHandler(e)}>
          <h1
            style={{
              marginBottom: "20px",
              width: "100%",
              textAlign: "center",
              paddingBottom: "1vmax",
            }}
          >
            Sign Up
          </h1>
          <Avatar
            sx={{
              height: window.innerWidth > 600 ? "11vmax" : "13vmax",
              width: window.innerWidth > 600 ? "11vmax" : "13vmax",
            }}
            src={avatarprev}
          />
          <Button onClick={handleClick} style={{ width: "40%" }}>
            Choose file
          </Button>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              setAvatar(e.target.files[0]);
              const file = e.target.files[0];

              const Reader = new FileReader();

              Reader.onload = (e) => {
                if (Reader.readyState === 2) {
                  setAvatarprev(Reader.result);
                }
              };
              Reader.readAsDataURL(file);
            }}
            required
            className="file-input"
            ref={myRefname}
            hidden={true}
          />
          <input
            type="name"
            placeholder="Name"
            required
            value={name}
            className="register-input"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            className="register-input"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="register-input"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* <Link to={"/forgot/password"}>forgot password?</Link> */}
          <Button disabled={loading} style={{ color: "white" }} type="submit">
            {loading && loading ? "Signing Up....." : "Sign Up"}
          </Button>
          <Link to={"/"}>Already have an account?</Link>
        </form>
      </div>
    </Fragment>
  );
};

export default Register;

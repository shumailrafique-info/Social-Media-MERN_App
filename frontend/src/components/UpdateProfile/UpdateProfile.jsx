import React, { Fragment, useEffect, useRef, useState } from "react";
import { Avatar, Button } from "@mui/material";
import "./UpdateProfile.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { updateProfile } from "../../redux/actions/postAction";
import { loadUser } from "../../redux/actions/userAction";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const Alert = useAlert();
  const Navigate = useNavigate();
  const myRefname = useRef(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("empty");
  const [avatarprev, setAvatarprev] = useState("");

  const { user } = useSelector((state) => state.user);
  const { error, loading, message } = useSelector((state) => state.like);

  const SubmitHandler = async (e) => {
    e.preventDefault();
    await dispatch(updateProfile(name, email, avatar));
    dispatch(loadUser());
    Navigate("/account");
  };

  useEffect(() => {
    if (message) {
      Alert.success(message);
      dispatch({ type: "ClearMessageLike" });
    }
    if (error) {
      Alert.error(error);
      dispatch({ type: "ClearErrorsLike" });
    }
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarprev(user.avatar.url);
    }
  }, [error, Alert, dispatch, user, message]);

  const handleClick = () => {
    myRefname.current.click();
  };

  return (
    <Fragment>
      <div className="update-form-container">
        <form onSubmit={(e) => SubmitHandler(e)}>
          <h1 style={{ marginBottom: "20px" }}>Update Profile</h1>
          <Avatar
            style={{ width: "11vmax", height: "11vmax" }}
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
            className="file-input"
            ref={myRefname}
            hidden={true}
          />
          <input
            type="name"
            placeholder="Name"
            required
            value={name}
            className="update-input"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            className="update-input"
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* <Link to={"/forgot/password"}>forgot password?</Link> */}
          <Button disabled={loading} style={{ color: "white" }} type="submit">
            {loading && loading ? "Updating....." : "Update"}
          </Button>
        </form>
      </div>
    </Fragment>
  );
};

export default UpdateProfile;

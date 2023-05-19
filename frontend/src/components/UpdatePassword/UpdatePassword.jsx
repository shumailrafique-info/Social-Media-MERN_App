import React, { Fragment, useEffect, useState } from "react";
import { Button } from "@mui/material";
import "./UpdatePassword.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { updatePassword } from "../../redux/actions/postAction";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const Alert = useAlert();
  const Navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { error, loading, message } = useSelector((state) => state.like);

  const SubmitHandler = async (e) => {
    e.preventDefault();
    await dispatch(updatePassword(oldPassword, newPassword, confirmPassword));
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
    if (message === "Password updated") {
      Navigate("/account");
    }
  }, [error, Alert, dispatch, message, Navigate]);

  return (
    <Fragment>
      <div className="updatePassword-form-container">
        <form onSubmit={(e) => SubmitHandler(e)}>
          <h1 style={{ marginBottom: "20px" }}>Change Password</h1>

          <input
            type="password"
            placeholder="Enter Old Password"
            required
            value={oldPassword}
            className="updatePassword-input"
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter New Password"
            required
            value={newPassword}
            className="updatePassword-input"
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            required
            value={confirmPassword}
            className="updatePassword-input"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <Button disabled={loading} style={{ color: "white" }} type="submit">
            {loading && loading ? "Changing....." : "Change"}
          </Button>
        </form>
      </div>
    </Fragment>
  );
};

export default UpdatePassword;

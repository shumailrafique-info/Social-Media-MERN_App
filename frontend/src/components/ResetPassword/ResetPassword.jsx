import React, { Fragment, useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { Link, useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../../redux/actions/postAction";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const Alert = useAlert();
  const Navigate = useNavigate();
  const { resetPasswordToken } = useParams();
  const [password, setPassword] = useState("");

  const { error, loading, message } = useSelector((state) => state.like);

  const SubmitHandler = async (e) => {
    e.preventDefault();
    console.log(resetPasswordToken, password);
    await dispatch(resetPassword(resetPasswordToken, password));
  };

  useEffect(() => {
    if (message) {
      Alert.success(message);
      if (message === "Password Updated") {
        Navigate("/");
      }
      dispatch({ type: "ClearMessageLike" });
    }
    if (error) {
      Alert.error(error);
      dispatch({ type: "ClearErrorsLike" });
    }
  }, [error, Alert, dispatch, message, Navigate]);

  return (
    <Fragment>
      <div className="forgotPassword-form-container">
        <form onSubmit={(e) => SubmitHandler(e)}>
          <h1 style={{ marginBottom: "20px" }}>Reset Password</h1>

          <input
            type="text"
            placeholder="Enter New Password"
            required
            value={password}
            className="forgotPassword-input"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Link to={"/"}>Wanna go back?</Link>

          <Button disabled={loading} style={{ color: "white" }} type="submit">
            {loading && loading ? "Processing....." : "Reset Password"}
          </Button>
        </form>
      </div>
    </Fragment>
  );
};

export default ResetPassword;

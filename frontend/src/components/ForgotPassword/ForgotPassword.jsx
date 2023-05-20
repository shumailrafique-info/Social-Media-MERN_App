import React, { Fragment, useEffect, useState } from "react";
import { Button } from "@mui/material";
import "./ForgotPassword.css";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { forgotPassword } from "../../redux/actions/postAction";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const Alert = useAlert();
  const [email, setEmail] = useState("");

  const { error, loading, message } = useSelector((state) => state.like);

  const SubmitHandler = async (e) => {
    e.preventDefault();
    await dispatch(forgotPassword(email));
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
  }, [error, Alert, dispatch, message]);

  return (
    <Fragment>
      <div className="forgotPassword-form-container">
        <form onSubmit={(e) => SubmitHandler(e)}>
          <h1 style={{ marginBottom: "20px" }}>Forgot Password</h1>

          <input
            type="text"
            placeholder="Enter Your Email"
            required
            value={email}
            className="forgotPassword-input"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Link style={{padding:".5vmax 0px"}} to={"/"}>Login ?</Link>
          <Button disabled={loading} style={{ color: "white" }} type="submit">
            {loading && loading
              ? "Sending Verification Mail....."
              : "Send Verification Mail"}
          </Button>
        </form>
      </div>
    </Fragment>
  );
};

export default ForgotPassword;

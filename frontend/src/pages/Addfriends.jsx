import { Button, Typography } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import User from "../components/User/User";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { getAllUsers } from "../redux/actions/userAction";
import Loader from "../components/Loader/Loader";
import "./AddFriends.css";

const Addfriends = () => {
  const dispatch = useDispatch();

  const Alert = useAlert();
  const { users, loading, error } = useSelector((state) => state.allUsers);
  const [name, setName] = useState("");

  useEffect(() => {
    dispatch(getAllUsers(name));
  }, [dispatch, name]);

  useEffect(() => {
    if (error) {
      Alert.error(error);
      dispatch({ type: "ClearErrorsAUR" });
    }
  }, [dispatch, error, Alert]);

  const SubmitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllUsers(name));
  };

  return (
    <div>
      <Fragment>
        <div className="search-form-container">
          <form onSubmit={(e) => SubmitHandler(e)}>
            <input
              type="text"
              placeholder="search by name"
              required
              value={name}
              className="search-input"
              onChange={(e) => setName(e.target.value)}
            />

            <Button disabled={loading} style={{ color: "white" }} type="submit">
              {loading && loading ? "Searching....." : "Search"}
            </Button>
          </form>
        </div>
      </Fragment>
      {loading && loading ? (
        <Loader />
      ) : (
        <div
          style={{
            width: "100vw",
            maxWidth: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
          className=""
        >
          {users && users.length > 0 ? (
            users.map((user1) => (
              <User
                key={user1._id}
                userId={user1._id}
                name={user1.name}
                avatar={user1.avatar.url}
              />
            ))
          ) : (
            <Typography>No Users found</Typography>
          )}
        </div>
      )}
    </div>
  );
};

export default Addfriends;

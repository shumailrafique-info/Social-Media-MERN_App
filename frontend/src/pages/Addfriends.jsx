import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import User from "../components/User/User";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { getAllUsers } from "../redux/actions/userAction";
import Loader from "../components/Loader/Loader";

const Addfriends = () => {
  const dispatch = useDispatch();

  const Alert = useAlert();
  const { users, loading, error } = useSelector((state) => state.allUsers);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      Alert.error(error);
      dispatch({ type: "ClearErrorsAUR" });
    }
  }, [dispatch, error, Alert]);

  return (
    <div>
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
          className="homeright"
        >
          <Typography variant="h4">All Users</Typography>
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
            <Typography>No Users Yet</Typography>
          )}
        </div>
      )}
    </div>
  );
};

export default Addfriends;

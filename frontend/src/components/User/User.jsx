import { Avatar, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "./user.css";

const User = ({ userId, name, avatar }) => {
  return (
    <div className="usercard">
      <Link to={`/user/${userId}`}>
        <Avatar
          src={avatar}
          alt={name}
          sx={{
            height: window.innerWidth > 600 ? "4vmax" : "6vmax",
            width: window.innerWidth > 600 ? "4vmax" : "6vmax",
          }}
        />
        <Typography>{name}</Typography>
      </Link>
    </div>
  );
};

export default User;

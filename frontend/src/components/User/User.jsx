import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "./user.css"

const User = ({ userId, name, avatar }) => {
  return (
    <Link className="homeUser usercard"  to={`/user/${userId}`} >
      <img style={{width:"4vmax",height:"4vmax"}} src={avatar} alt={name} />
      <Typography className="usertext">{name}</Typography>
    </Link>
  );
};

export default User;

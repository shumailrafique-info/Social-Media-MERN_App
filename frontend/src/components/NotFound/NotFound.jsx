import { ErrorOutline } from "@mui/icons-material";
import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "./notfouund.css";

const NotFound = () => {
  return (
    <div className="notFound">
      <div className="notFoundContainer">
        <ErrorOutline />
        <Typography
          variant="h2"
          style={{ padding: "2vmax", textAlign: "center",fontSize:'2rem' }}
        >
          Page Not Found
        </Typography>

        <Link to="/">
          <Typography style={{color:"blue"}} variant="h5">Go to Home</Typography>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

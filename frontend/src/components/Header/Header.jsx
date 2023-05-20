import React, { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import {
  Home,
  HomeOutlined,
  Add,
  AddOutlined,
  AccountCircle,
  AccountCircleOutlined,
} from "@mui/icons-material";
import AddReactionOutlinedIcon from "@mui/icons-material/AddReactionOutlined";
import AddReactionIcon from "@mui/icons-material/AddReaction";

const Header = () => {
  const [tab, setTab] = useState(window.location.pathname);

  return (
    <div className="header">
      <Link to={"/"} onClick={() => setTab("/")}>
        {tab === "/" ? <Home style={{ color: "black" }} /> : <HomeOutlined />}
      </Link>
      <Link to={"/newpost"} onClick={() => setTab("/newpost")}>
        {tab === "/newpost" ? (
          <Add style={{ color: "black" }} />
        ) : (
          <AddOutlined />
        )}
      </Link>
      <Link to={"/addfriends"} onClick={() => setTab("/addfriends")}>
        {tab === "/addfriends" ? (
          <AddReactionIcon style={{ color: "black" }} />
        ) : (
          <AddReactionOutlinedIcon />
        )}
      </Link>
      <Link to={"/account"} onClick={() => setTab("/account")}>
        {tab === "/account" ? (
          <AccountCircle style={{ color: "black" }} />
        ) : (
          <AccountCircleOutlined />
        )}
      </Link>
    </div>
  );
};

export default Header;

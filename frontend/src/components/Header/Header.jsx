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
        {tab === "/" ? (
          <Home style={{ color: "rgb(5, 135, 241)" }} />
        ) : (
          <HomeOutlined style={{ color: "rgba(36, 95, 143,.7)" }} />
        )}
      </Link>
      <Link to={"/newpost"} onClick={() => setTab("/newpost")}>
        {tab === "/newpost" ? (
          <Add style={{ color: "rgb(5, 135, 241)" }} />
        ) : (
          <AddOutlined style={{ color: "rgba(36, 95, 143,.7)" }} />
        )}
      </Link>
      <Link to={"/addfriends"} onClick={() => setTab("/addfriends")}>
        {tab === "/addfriends" ? (
          <AddReactionIcon style={{ color: "rgb(5, 135, 241)" }} />
        ) : (
          <AddReactionOutlinedIcon style={{ color: "rgba(36, 95, 143,.7)" }} />
        )}
      </Link>
      <Link to={"/account"} onClick={() => setTab("/account")}>
        {tab === "/account" ? (
          <AccountCircle style={{ color: "rgb(5, 135, 241)" }} />
        ) : (
          <AccountCircleOutlined style={{ color: "rgba(36, 95, 143,.7)" }} />
        )}
      </Link>
    </div>
  );
};

export default Header;

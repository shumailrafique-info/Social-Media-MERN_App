import { Avatar, Typography } from "@mui/material";
import "./info.css";
import React from "react";
import image from "../../assets/1682665333061.png.jpg";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const Info = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        maxWidth: "100%",
        height: "90vh",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Avatar
          src={image}
          style={{
            margin: "1vmax",
            fontFamily: "Roboto",
            boxShadow:
              "rgb(85, 91, 255) 0px 0px 0px 3px, rgb(31, 193, 27) 0px 0px 0px 6px, rgb(255, 217, 19) 0px 0px 0px 9px",
          }}
          alt="Shumail Rafique"
          sx={{
            height: window.innerWidth > 600 ? "13vmax" : "20vmax",
            width: window.innerWidth > 600 ? "13vmax" : "20vmax",
          }}
        />
        <Typography variant="h4">Shumail Rafique</Typography>
        <Typography
          variant="p"
          style={{ margin: ".5vmax", color: "rgba(0, 0, 0, 0.301)" }}
        >
          Full Stack Mern Web Developer
        </Typography>

        <div className="CreatedByLinks">
          <Link
            target="_blank"
            to={"https://instagram.com/shumail_sandhu_?igshid=MzNlNGNkZWQ4Mg=="}
          >
            <InstagramIcon />
          </Link>
          <Link
            target="_blank"
            to={"https://www.facebook.com/shumail.sandhu.338?mibextid=ZbWKwL"}
          >
            <FacebookIcon />
          </Link>
          <Link
            target="_blank"
            to={"https://www.linkedin.com/in/shumail-rafique-66204b250"}
          >
            <LinkedInIcon />
          </Link>
          <Link target="_blank" to={"https://wa.me/+923013636231"}>
            <WhatsAppIcon />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Info;

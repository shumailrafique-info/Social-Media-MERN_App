const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();

//Dotenv Connection
require("dotenv").config({ path: "backend/config/config.env" });

//using Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//importing Routes
const postRouter = require("./routes/postRoute.js");
const userRouter = require("./routes/userRoute.js");

//Using Routes
app.use("/api/v1/post", postRouter);
app.use("/api/v1/users", userRouter);

app.use(express.static(path.join(__dirname, "./build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./build/index.html"));
});
app.get("/", (req, res) => {
  res.send("Welcome to Social media app server");
});

module.exports = app;

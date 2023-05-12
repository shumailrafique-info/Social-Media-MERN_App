const express = require("express");
const cookieParser = require("cookie-parser");

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

module.exports = app;

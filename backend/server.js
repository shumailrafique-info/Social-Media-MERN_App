const app = require("./app.js");
const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
//Connecting with Database
require("./config/database.js");

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port No:${process.env.PORT}`);
});

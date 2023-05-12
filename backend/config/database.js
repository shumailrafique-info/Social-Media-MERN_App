const mongoose = require("mongoose");

mongoose
  .connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    { dbName: "Social-Media" }
  )
  .then((data) => {
    console.log(
      `Connection to Database Successfull at ${data.connection.host}`
    );
  })
  .catch((err) => {
    console.log(err);
  });

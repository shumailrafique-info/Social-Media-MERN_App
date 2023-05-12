const app = require("./app.js");

//Connecting with Database
require("./config/database.js");

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port No:${process.env.PORT}`);
});

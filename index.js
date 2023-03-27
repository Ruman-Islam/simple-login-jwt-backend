require("dotenv").config();
const port = process.env.PORT || 8080;
const dbConnect = require("./utils/dbConnect");

const app = require("./utils/app");

// Database connection
dbConnect();

// server
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

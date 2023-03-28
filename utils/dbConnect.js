const mongoose = require("mongoose");

const DBConnect = () => {
  mongoose
    .connect(process.env.ATLAS_URI, {
    //   useNewUrlParser: true,
    //   usUnifiedTopology: true,
    })
    .then(() => {
      console.log(`Database connection is successful 🛢`);
    })
    .catch((err) => console.log("Error message -", err));
};

module.exports = DBConnect;
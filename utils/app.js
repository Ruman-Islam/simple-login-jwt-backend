const express = require("express");
const app = express();
const cors = require("cors");

// ROUTES IMPORT //
const userRoute = require("../routes/userRoute");

// APPLICATION MIDDLEWARE //
app.use(cors());
app.use(express.json());

// APPLICATION ROUTES //
app.use("/api/user", userRoute);

app.get("/", (req, res) =>
  res.status(200).send("WELCOME TO THE SIMPLE JWT FORM!")
);

app.all("*", (req, res) => res.status(200).send("NO ROUTE FOUND."));

module.exports = app;
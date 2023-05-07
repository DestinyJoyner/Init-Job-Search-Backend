// DEPENDENCIES
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const userController = require("./controllers/usersController.js");
const jobsController = require("./controllers/jobsController.js");

// CONFIGURE
const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());
// CONTROLLERS
app.use("/users", userController);
app.use("/jobs", jobsController);

// ROUTES
app.get("/", (req, res) => {
  res.status(200).send("Welcome to Init Server");
});

app.get("/not-found", (req, res) => {
  res.status(404).json({
    error: "Page Not Found",
  });
});

app.get("*", (req, res) => {
  res.redirect("/not-found");
});

// EXPORT
module.exports = app;

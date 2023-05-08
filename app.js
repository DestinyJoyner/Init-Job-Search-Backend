// DEPENDENCIES
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const userController = require("./controllers/usersController.js");
const jobsController = require("./controllers/jobsController.js");
const skillsController = require("./controllers/skillsController.js")
const userSkillsController = require("./controllers/userSkillsController.js")
const jobSkillsController = require("./controllers/jobSkillsController.js")

// CONFIGURE
const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());
// CONTROLLERS
app.use("/users", userController);
app.use("/jobs", jobsController);
app.use("/skills", skillsController);
app.use("/user-skills", userSkillsController);
app.use("/job-skills", jobSkillsController)

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

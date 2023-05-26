// DEPENDENCIES
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const userController = require("./controllers/userController.js");
const loginController = require("./controllers/loginController.js");
const jobController = require("./controllers/jobController.js");
const skillController = require("./controllers/skillController.js");
const userSkillController = require("./controllers/userSkillController.js");
const jobSkillController = require("./controllers/jobSkillController.js");
const userJobController = require("./controllers/userJobController.js");
const recruiterController = require("./controllers/recruiterController.js");

// CONFIGURE
const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());
// CONTROLLERS
app.use("/users", userController);
app.use("/logins", loginController);
app.use("/jobs", jobController);
app.use("/skills", skillController);
app.use("/user-skills", userSkillController);
app.use("/job-skills", jobSkillController);
app.use("/user-jobs", userJobController);
app.use("/recruiters", recruiterController);

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

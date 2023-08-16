const express = require("express");
const userJobs = express.Router();
const {
  getAllUserJobs,
  createUserJob,
  deleteUserJob,
  getOneUserJob
} = require("../queries/userJobs.js");

// SHOW
userJobs.get("/:userID", async (req, res) => {
  const { userID } = req.params;
  const allUserJobs = await getAllUserJobs(userID);
  res.status(200).json(allUserJobs);
});

// Get userId and specific job Id info
userJobs.get("/:userID/:jobID", async (req, res) => {
  const { userID, jobID } = req.params;
  const dateJobAppliedByUser = await getOneUserJob(userID, jobID);
  res.status(200).json(dateJobAppliedByUser);
});


// CREATE
userJobs.post("/", async (req, res) => {
  const newUserJob = await createUserJob(req.body);
  if (!newUserJob.message) {
    res.status(200).json(newUserJob);
  } else {
    res.redirect("/not-found");
  }
});

// DELETE
userJobs.delete("/", async (req, res) => {
  const deletedUserJob = await deleteUserJob(req.body);

  if (!deletedUserJob.message) {
    res.status(200).json(deletedUserJob);
  } else {
    res.status(500).json({ Error: deletedUserJob.message });
  }
});

module.exports = userJobs;

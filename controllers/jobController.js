const express = require("express");
const jobs = express.Router();
const {
  getAllJobs,
  getOneJob,
  createJob,
  updateJob,
  deleteJob,
} = require("../queries/jobs.js");
const { taskFormat, skillCheck, jobSchema } = require("../middleware/schemaValidations/jobValidation.js")
const {validationError} = require("../middleware/schemaValidations/errorValidation.js")

// INDEX
jobs.get("/", async (req, res) => {
  const allJobs = await getAllJobs();
  if (allJobs.length) {
    res.status(200).json(allJobs);
  } else {
    res.status(500).json({ Error: "Server Error" });
  }
});

// SHOW
jobs.get("/:id", async (req, res) => {
  const { id } = req.params;
  const oneJob = await getOneJob(id);

  if (!oneJob.message) {
    res.status(200).json(oneJob);
  } else {
    res.redirect("/not-found");
  }
});

// CREATE
jobs.post("/", skillCheck, taskFormat, jobSchema, validationError, async (req, res) => {
  const newJob = await createJob(req.body);
  if (!newJob.message) {
    res.status(200).json(newJob);
  } else {
    res.status(500).json({ Error: newJob.message });
  }
});

// DELETE
jobs.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedJob = await deleteJob(id);

  if (!deletedJob.message) {
    res.status(200).json(deletedJob);
  } else {
    res.status(500).json({ Error: deletedJob.message });
  }
});

// UPDATE
jobs.put("/:id", skillCheck, taskFormat, jobSchema, validationError, async (req, res) => {
  const { id } = req.params;
  const updatedJob = await updateJob(req.body, id);

  if (!updatedJob.message) {
    res.status(200).json(updatedJob);
  } else {
    res.status(500).json({ Error: updatedJob.message });
  }
});

module.exports = jobs;

const express = require("express");
const jobs = express.Router();
const {
  getAllJobs,
  getOneJob,
  createJob,
  updateJob,
  deleteJob,
  getSkillsForJobByJobId,
} = require("../queries/jobs.js");
const {
  taskFormat,
  skillCheck,
  jobSchema,
} = require("../middleware/schemaValidations/jobValidation.js");
const {
  jobQuerySchema,
} = require("../middleware/jobsStartLimitQueryFunctions.js");
const {
  validationError,
} = require("../middleware/schemaValidations/errorValidation.js");
const { deleteAllUserSkills } = require("../queries/userSkills.js");

// INDEX
jobs.get("/", jobQuerySchema, validationError, async (req, res) => {
  const { start, limit, input, city, remote, skills } = req.query;

  let isRemote = undefined;
  if (remote !== undefined) {
    if (remote.toLowerCase() === "true") {
      isRemote = true;
    }
    if (remote.toLowerCase() === "false") {
      isRemote = false;
    }
  }

  let skillCount = undefined;
  let skillDbSyntax = undefined;
  if (skills) {
    const skillQueryArr = skills.split(",");
    skillCount = skillQueryArr.length;
    const addQueryText = skillQueryArr.map((skill) => `skill_id=${+skill}`);
    skillDbSyntax = addQueryText.join(" OR ");
  }

  const allJobs = await getAllJobs(
    limit,
    start,
    input,
    city,
    isRemote,
    skillDbSyntax,
    skillCount
  );

  if (allJobs.length > 0) {
    const allJobsWithSkills = await Promise.all(
      allJobs.map(async (job) => {
        let skills = await getSkillsForJobByJobId(job.id);

        const skillIds = skills.map((skillObj) => {
          return skillObj.id;
        });

        job.skill_id = skillIds;

        return job;
      })
    );
    res.status(200).json(allJobsWithSkills);
  } else if (allJobs.length === 0) {
    res.status(200).json(allJobs);
  } else {
    res.status(500).json({ Error: allJobs.message });
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
jobs.post(
  "/",
  skillCheck,
  taskFormat,
  jobSchema,
  validationError,
  async (req, res) => {
    console.log(req.body)
    const newJob = await createJob(req.body);
    if (!newJob.message) {
      res.status(200).json(newJob);
    } else {
      res.status(500).json({ Error: newJob.message });
    }
  }
);

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
jobs.put(
  "/:id",
  skillCheck,
  taskFormat,
  jobSchema,
  validationError,
  async (req, res) => {
    const { id } = req.params;
    const updatedJob = await updateJob(req.body, id);

    if (!updatedJob.message) {
      res.status(200).json(updatedJob);
    } else {
      res.status(500).json({ Error: updatedJob.message });
    }
  }
);

module.exports = jobs;

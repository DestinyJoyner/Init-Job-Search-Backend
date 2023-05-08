const db = require("../db/dbConfig.js");

const getAllJobs = async () => {
  try {
    const allJobIDs = await db.any(
      "SELECT * FROM jobs_skills JOIN jobs ON jobs.id = jobs_skills.job_id JOIN skills ON skills.id = jobs_skills.skill_id"
    );
    const allJobDetails = allJobIDs.reduce((acc, e) => {
      const val = e["job_id"];
      if (acc[val]) {
        acc[val] = {
          ...acc[val],
          ["skill_name"]: [...[acc[val]["skill_name"]], e["skill_name"]],
        };
        return acc;
      } else {
        return (acc = { ...acc, [e["job_id"]]: e });
      }
    }, {});
    const arr = [];
    for (let i in allJobDetails) {
      arr.push(allJobDetails[i]);
    }
    return arr;
  } catch (error) {
    return error;
  }
};

const getOneJob = async (jobID) => {
  try {
    const oneJob = await db.one("SELECT * FROM jobs WHERE id=$1", jobID);

    const jobSkills = await db.any(
      "SELECT skill_name FROM jobs_skills JOIN skills ON skills.id = jobs_skills.skill_id WHERE job_id=$1",
      jobID
    );
    oneJob.skills = jobSkills.map(({ skill_name }) => skill_name);

    return oneJob;
  } catch (error) {
    return error;
  }
};

const createJob = async ({ title, company, city, details, full_remote }) => {
  try {
    const newJob = await db.one(
      "INSERT INTO jobs (title, company, city, details, full_remote) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [title, company, city, details, full_remote]
    );
    return newJob;
  } catch (error) {
    return error;
  }
};

const updateJob = async (job, jobID) => {
  const { title, company, city, details, full_remote } = job;
  try {
    const updatedJob = await db.one(
      "UPDATE jobs SET title=$1, company=$2, city=$3, details=$4, full_remote=$5 WHERE id=$6 RETURNING *",
      [title, company, city, details, full_remote, jobID]
    );
    return updatedJob;
  } catch (error) {
    return error;
  }
};

const deleteJob = async (jobID) => {
  try {
    const deletedJob = await db.one(
      "DELETE FROM jobs WHERE id=$1 RETURNING *",
      jobID
    );
    return deletedJob;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllJobs,
  getOneJob,
  createJob,
  updateJob,
  deleteJob,
};

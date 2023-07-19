const db = require("../db/dbConfig.js");
const { createJobSkill, deleteAllJobSkills } = require("./jobSkills.js");

// variables for offset/ limit in postgresql commands for pagination
const getAllJobs = async (startValue , limitValue ) => {
  console.log(limitValue)
  try {

    // test query
    // group by
    const allJobsWithQueryValues = await db.any(
      "DROP TABLE IF EXISTS jobQuery; CREATE TABLE jobQuery AS ( SELECT id, title, company, city, details, full_remote FROM jobs LIMIT $2 OFFSET $1); SELECT jobQuery.id, title, company, city, details, full_remote, skill_name, skill_id FROM jobs_skills JOIN jobQuery ON jobQuery.id = jobs_skills.job_id JOIN skills ON skills.id = jobs_skills.skill_id", [startValue, limitValue] ,
    );

    const reduceJobKeyValues = allJobsWithQueryValues.reduce((acc, e) => {
      const val = e["id"];
      if (acc[val]) {
        acc[val] = {
          ...acc[val],
          ["skill_name"]: [...[acc[val]["skill_name"]], e["skill_name"]].flat(),
          ["skill_id"]: [...[acc[val]["skill_id"]], e["skill_id"]].flat(),
        };

        return acc;
      } else {
        return (acc = { ...acc, [e["id"]]: e });
      }
    }, {});
    const distinctJobWithDetailsArr = [];
    for (let i in reduceJobKeyValues) {
      distinctJobWithDetailsArr.push(reduceJobKeyValues[i]);
    }
    return distinctJobWithDetailsArr
    // return allJobsWithQueryValues

      // SELECT job_id, title, company, city, details, full_remote, skill_name FROM jobs_skills JOIN jobs ON jobs.id = jobs_skills.job_id JOIN skills ON skills.id = jobs_skills.skill_id)"



    // const allJobIDs = await db.any(
    //   "SELECT job_id, title, company, city, details, full_remote, skill_name FROM jobs_skills JOIN jobs ON jobs.id = jobs_skills.job_id JOIN skills ON skills.id = jobs_skills.skill_id"
    // );
    // const allJobIDs = await db.any(
    //   "SELECT job_id, title, company, city, details, full_remote, tasks, recruiter_id, skill_name, skill_id FROM jobs_skills JOIN jobs ON jobs.id = jobs_skills.job_id JOIN skills ON skills.id = jobs_skills.skill_id"
    // );


    // console.log(allJobIDs)
    const allJobDetails = allJobIDs.reduce((acc, e) => {
      const val = e["job_id"];
      if (acc[val]) {
        // acc[val] = {
        //   ...acc[val],
        //   ["skill_name"]: [...[acc[val]["skill_name"]], e["skill_name"]].flat(),
        // };
        acc[val] = {
          ...acc[val],
          ["skill_name"]: [...[acc[val]["skill_name"]], e["skill_name"]].flat(),
          ["skill_id"]: [...[acc[val]["skill_id"]], e["skill_id"]].flat(),
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
      "SELECT skill_name, skill_id FROM jobs_skills JOIN skills ON skills.id = jobs_skills.skill_id WHERE job_id=$1",
      jobID
    );
    oneJob.skills = jobSkills.map(({ skill_name, skill_id }) => {
      return { [skill_id]: skill_name };
    });

    return oneJob;
  } catch (error) {
    return error;
  }
};

const createJob = async ({ jobDetails, skills }) => {
  try {
    const { title, company, city, details, full_remote, tasks, recruiter_id } =
      jobDetails;
    const newJob = await db.one(
      "INSERT INTO jobs (title, company, city, details, full_remote, tasks, recruiter_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [title, company, city, details, full_remote, tasks, recruiter_id]
    );

    skills.forEach((skillID) => {
      const obj = {
        ["job_id"]: newJob.id,
        ["skill_id"]: skillID,
      };
      createJobSkill(obj);
    });
    return newJob;
  } catch (error) {
    return error;
  }
};

const updateJob = async (job, jobID) => {
  const { title, company, city, details, full_remote, tasks } = job.jobDetails;
  const { skills } = job;
  try {
    const updatedJob = await db.one(
      "UPDATE jobs SET title=$1, company=$2, city=$3, details=$4, full_remote=$5, tasks=$6 WHERE id=$7 RETURNING *",
      [title, company, city, details, full_remote, tasks, jobID]
    );
    deleteAllJobSkills(jobID);
    skills.forEach((e) =>
      // const obj = {
      //   ["job_id"]: jobID,
      //   ["skill_id"]: skillID,
      // };
      // createJobSkill(obj);
      db.one(
        "INSERT INTO jobs_skills (job_id, skill_id) VALUES ($1, $2) RETURNING *",
        [jobID, e]
      )
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

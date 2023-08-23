const db = require("../db/dbConfig.js");
const { createJobSkill, deleteAllJobSkills } = require("./jobSkills.js");

const getAllJobs = async (
  limitValue,
  startValue,
  input,
  city,
  remote,
  skills,
  skillCount
) => {
  const inputQuery = input
    ? `  (
    (
  (LOWER(regexp_replace(title, ' ', '', 'g')) LIKE $3)  OR
  (LOWER(regexp_replace(city, ' ', '', 'g')) LIKE $3)  OR
  (LOWER(regexp_replace(details, ' ', '', 'g')) LIKE $3)  OR
  (LOWER(regexp_replace(company, ' ', '', 'g')) LIKE $3)
  ) 

)`
    : null;

  const cityQuery = city
    ? `LOWER(regexp_replace(city, ' ', '', 'g')) LIKE $4`
    : null;

  const remoteQuery =
    remote !== undefined
      ? `
  full_remote IS $5`
      : null;

  const whereKeyword =
    inputQuery || cityQuery || remoteQuery || skills
      ? `WHERE (
  ${skills ? skills : ""}
  ${skills && (inputQuery || cityQuery || remoteQuery) ? "AND" : ""}
  ${inputQuery ? inputQuery : ""}
  ${inputQuery && cityQuery ? "AND" : ""} 
  ${cityQuery ? cityQuery : ""}
  ${remoteQuery && (cityQuery || inputQuery) ? "AND" : ""}
  ${remoteQuery ? remoteQuery : ""}
)`
      : "";

  let dbCommand = skills
    ? `SELECT 
id, title, company, city, details, full_remote, tasks, recruiter_id
FROM jobs
INNER JOIN jobs_skills
ON jobs_skills.job_id=jobs.id 
${whereKeyword && whereKeyword}
GROUP BY jobs.id 
HAVING 
COUNT(job_id) = $7
ORDER BY id 
LIMIT $1  
OFFSET $2
`
    : `SELECT * 
FROM jobs
${whereKeyword && whereKeyword}
ORDER BY id 
LIMIT $1  
OFFSET $2
`;
  try {
    const allJobs = await db.any(
      `
      ${dbCommand}
       `,
      [
        limitValue,
        startValue,
        `%${input}%`,
        `%${city}%`,
        remote,
        skills,
        skillCount,
      ]
    );

    return allJobs;
  } catch (error) {
    return error;
  }
};

const getSkillsForJobByJobId = async (jobId) => {
  const allSkills = await db.any(
    `
    SELECT id FROM jobs_skills 
    JOIN skills
    ON jobs_skills.skill_id = skills.id
    WHERE jobs_skills.job_id = $1
   `,
    [jobId]
  );

  return allSkills;
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
  // console.log(skills, jobDetails)
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
    console.log(error)
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
  getSkillsForJobByJobId,
};

const db = require("../db/dbConfig.js");
const { alreadyExists } = require("./queryValidations.js");

const createJobSkill = async ({ job_id, skill_id }) => {
  const exist = await alreadyExists(
    { ["job_id"]: job_id, ["skill_id"]: skill_id },
    "jobs_skills"
  );
  if (exist) {
    return { error: "Entry already exists!" };
  } else {
    try {
      const newJobSkill = await db.one(
        "INSERT INTO jobs_skills (job_id, skill_id) VALUES ($1, $2) RETURNING *",
        [job_id, skill_id]
      );
      return newJobSkill;
    } catch (error) {
      return error;
    }
  }
};

const deleteJobSkill = async ({ job_id, skill_id }) => {
  try {
    const deletedSkill = await db.one(
      "DELETE FROM jobs_skills WHERE job_id=$1 AND skill_id=$2 RETURNING *",
      [job_id, skill_id]
    );
    return deletedSkill;
  } catch (error) {
    return error;
  }
};

const deleteAllJobSkills = async (jobID) => {
  try {
    const deletedAllJobSkills = await db.any(
      "DELETE FROM jobs_skills WHERE job_id=$1 RETURNING *",
      jobID
    );
    return deleteAllJobSkills;
  } catch (error) {
    return error;
  }
};

module.exports = {
  createJobSkill,
  deleteJobSkill,
  deleteAllJobSkills,
};

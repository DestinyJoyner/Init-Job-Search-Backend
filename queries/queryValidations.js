const db = require("../db/dbConfig.js");

const alreadyExists = async (bodyReq, table) => {
  const { skill_id, user_id, job_id } = bodyReq;
  let match;
  switch (table) {
    case "users_skills":
      try {
        match = await db.one(
          "SELECT * FROM users_skills WHERE user_id=$1 AND skill_id=$2",
          [user_id, skill_id]
        );
      } catch (error) {
        return false;
      }
      return true;
    case "users_jobs":
      try {
        match = await db.one(
          "SELECT * FROM users_jobs WHERE user_id=$1 AND job_id=$2",
          [user_id, job_id]
        );
      } catch (error) {
        return false;
      }
      return true;
    case "jobs_skills":
      try {
        match = await db.one(
          "SELECT * FROM jobs_skills WHERE job_id=$1 AND skill_id=$2",
          [job_id, skill_id]
        );
      } catch (error) {
        return false;
      }
      return true;
  }
};

module.exports = { alreadyExists };
